const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 1234;

// 1. 處理靜態檔案
app.use(express.static(__dirname));
app.use(express.json());

// 2. 模擬 Storage
if (!fs.existsSync('storage.json')) {
    fs.writeFileSync('storage.json', JSON.stringify({ lastQuery: {} }));
}

// 3. 偽後端 API 路由
app.get('/api/weather', async (req, res) => {
    const city = req.query.locationName;
    console.log(`[${new Date().toISOString()}] GET /api/weather - city: ${city}`);
    
    if (!city) {
        return res.status(400).json({ success: 'false', message: '缺少 locationName 參數' });
    }

    const API_KEY = 'CWA-42277493-253C-403D-A3DC-9F2591599633';
    
    try {
        const url = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${API_KEY}&locationName=${encodeURIComponent(city)}`;
        console.log(`Fetching from: ${url}`);
        
        const response = await fetch(url);
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`CWA API error: ${response.status} ${errorText}`);
            return res.status(response.status).json({ success: 'false', message: 'CWA API 錯誤' });
        }
        
        const data = await response.json();

        // 模擬 Storage 寫入
        try {
            const storage = JSON.parse(fs.readFileSync('storage.json', 'utf8'));
            storage.lastQuery = { city, time: new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' }) };
            fs.writeFileSync('storage.json', JSON.stringify(storage, null, 2));
        } catch (fsError) {
            console.error('Storage write error:', fsError);
        }

        res.json(data);
    } catch (error) {
        console.error('Fetch error:', error);
        res.status(500).json({ success: 'false', message: '後端連線異常' });
    }
});

app.listen(PORT, () => {
    console.log(`✅ 伺服器運作中：http://localhost:${PORT}`);
});