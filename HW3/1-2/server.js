const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 2234;

// 設定 EJS 為 View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 處理靜態檔案與解析表單
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 模擬 Storage：如果 storage.json 不存在就建立一個
if (!fs.existsSync('storage.json')) {
    fs.writeFileSync('storage.json', JSON.stringify({ lastQuery: {} }));
}

// 1. 首頁路由：渲染初始表單畫面
app.get('/', (req, res) => {
    const storage = JSON.parse(fs.readFileSync('storage.json', 'utf8'));
    res.render('index', { lastQuery: storage.lastQuery });
});

// 2. 天氣查詢路由：由後端向 API 請求資料並渲染結果
app.get('/weather', async (req, res) => {
    const city = req.query.locationName;
    const API_KEY = 'CWA-42277493-253C-403D-A3DC-9F2591599633';
    
    if (!city) {
        return res.redirect('/');
    }

    try {
        const url = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${API_KEY}&locationName=${encodeURIComponent(city)}`;
        const response = await fetch(url);
        const data = await response.json();

        const storage = JSON.parse(fs.readFileSync('storage.json', 'utf8'));

        if (data.success === 'true' && data.records.location.length > 0) {
            const location = data.records.location[0];
            const weatherElement = location.weatherElement;
            const wx = weatherElement.find(el => el.elementName === 'Wx').time[0];
            const startTime = new Date(wx.startTime);

            const weatherData = {
                locationName: location.locationName,
                timeString: `${startTime.getMonth() + 1}/${startTime.getDate()} ${startTime.getHours().toString().padStart(2, '0')}:00 預報`,
                weatherState: wx.parameter.parameterName,
                iconUrl: `https://www.cwa.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/${wx.parameter.parameterValue.padStart(2, '0')}.svg`,
                minTemp: weatherElement.find(el => el.elementName === 'MinT').time[0].parameter.parameterName,
                maxTemp: weatherElement.find(el => el.elementName === 'MaxT').time[0].parameter.parameterName,
                pop: weatherElement.find(el => el.elementName === 'PoP').time[0].parameter.parameterName,
            };

            // 模擬 Storage 寫入
            storage.lastQuery = { city, time: new Date().toLocaleString() };
            fs.writeFileSync('storage.json', JSON.stringify(storage, null, 2));

            // 將處理好的資料傳給 EJS 進行渲染
            res.render('index', { weatherData, city, lastQuery: storage.lastQuery });
        } else {
            res.render('index', { error: '查無該城市天氣資料', city, lastQuery: storage.lastQuery });
        }
    } catch (error) {
        console.error('API Error:', error);
        const storage = JSON.parse(fs.readFileSync('storage.json', 'utf8'));
        res.render('index', { error: '後端連線異常，請稍後再試', city, lastQuery: storage.lastQuery });
    }
});

// 保留原有的 API 路由（可選，若仍有前端 JS 需要呼叫）
app.get('/api/weather', async (req, res) => {
    const city = req.query.locationName;
    const API_KEY = 'CWA-42277493-253C-403D-A3DC-9F2591599633';
    
    try {
        const url = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${API_KEY}&locationName=${encodeURIComponent(city)}`;
        const response = await fetch(url);
        const data = await response.json();

        const storage = JSON.parse(fs.readFileSync('storage.json', 'utf8'));
        storage.lastQuery = { city, time: new Date().toLocaleString() };
        fs.writeFileSync('storage.json', JSON.stringify(storage, null, 2));

        res.json(data);
    } catch (error) {
        res.status(500).json({ success: 'false', message: '後端連線異常' });
    }
});

app.listen(PORT, () => {
    console.log(`✅ 伺服器運作中：http://localhost:${PORT}`);
});