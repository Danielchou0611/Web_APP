const weatherForm = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');

const API_KEY = 'CWA-42277493-253C-403D-A3DC-9F2591599633';

weatherForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const cityName = cityInput.value;
    if (!cityName) return;
    fetchWeather(cityName);
});

async function fetchWeather(cityName) {
    weatherResult.innerHTML = '<p>讀取中...</p>';
    try {
        const url = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${API_KEY}&locationName=${encodeURIComponent(cityName)}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.success === 'true' && data.records.location.length > 0) {
            const location = data.records.location[0];
            const weatherElement = location.weatherElement;

            const wxElement = weatherElement.find(el => el.elementName === 'Wx').time[0];
            const weatherState = wxElement.parameter.parameterName;
            const weatherCode = wxElement.parameter.parameterValue; // 天氣代碼
            
            const minTemp = weatherElement.find(el => el.elementName === 'MinT').time[0].parameter.parameterName;
            const maxTemp = weatherElement.find(el => el.elementName === 'MaxT').time[0].parameter.parameterName;
            const pop = weatherElement.find(el => el.elementName === 'PoP').time[0].parameter.parameterName;

            // 格式化日期
            const startTime = new Date(wxElement.startTime);
            const timeString = `${startTime.getMonth() + 1}/${startTime.getDate()} ${startTime.getHours().toString().padStart(2, '0')}:00 預報`;

            // 根據代碼決定圖示 (使用氣象署官方 SVG)
            // 代碼需要補零成兩位數
            const iconCode = weatherCode.padStart(2, '0');
            const iconUrl = `https://www.cwa.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/${iconCode}.svg`;

            weatherResult.innerHTML = `
                <h3>${location.locationName}</h3>
                <p class='forecast-time'>${timeString}</p>
                
                <div class='weather-display'>
                    <img src='${iconUrl}' alt='${weatherState}' class='weather-icon'>
                    <div class='weather-state'>${weatherState}</div>
                </div>

                <div class='weather-info'>
                    <p><span>氣溫範圍</span> <strong>${minTemp}°C - ${maxTemp}°C</strong></p>
                    <p><span>降雨機率</span> <strong>${pop}%</strong></p>
                </div>
            `;
        } else {
            weatherResult.innerHTML = `<p>目前無法取得 "${cityName}" 的天氣資訊。</p>`;
        }
    } catch (error) {
        console.error('Error fetching weather:', error);
        weatherResult.innerHTML = '<p>擷取資料時發生錯誤，請稍後再試。</p>';
    }
}