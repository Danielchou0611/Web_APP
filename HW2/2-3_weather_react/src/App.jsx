import { useState } from 'react'
import './App.css'

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = 'CWA-42277493-253C-403D-A3DC-9F2591599633';

  const fetchWeather = async (e) => {
    e.preventDefault();
    if (!city) return;

    setLoading(true);
    setWeatherData(null);

    try {
      const url = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${API_KEY}&locationName=${encodeURIComponent(city)}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.success === 'true' && data.records.location.length > 0) {
        const location = data.records.location[0];
        const weatherElement = location.weatherElement;

        const wx = weatherElement.find(el => el.elementName === 'Wx').time[0];
        const startTime = new Date(wx.startTime);

        setWeatherData({
          locationName: location.locationName,
          timeString: `${startTime.getMonth() + 1}/${startTime.getDate()} ${startTime.getHours().toString().padStart(2, '0')}:00 預報`,
          weatherState: wx.parameter.parameterName,
          iconUrl: `https://www.cwa.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/${wx.parameter.parameterValue.padStart(2, '0')}.svg`,
          minTemp: weatherElement.find(el => el.elementName === 'MinT').time[0].parameter.parameterName,
          maxTemp: weatherElement.find(el => el.elementName === 'MaxT').time[0].parameter.parameterName,
          pop: weatherElement.find(el => el.elementName === 'PoP').time[0].parameter.parameterName,
        });
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>台灣天氣預報</h2>
      
      <form className="weather-form" onSubmit={fetchWeather}>
        <select value={city} onChange={(e) => setCity(e.target.value)} required>
          <option value="" disabled>請選擇縣市</option>
          <optgroup label="北部地區">
            <option value="臺北市">臺北市</option>
            <option value="新北市">新北市</option>
            <option value="基隆市">基隆市</option>
            <option value="新竹市">新竹市</option>
            <option value="新竹縣">新竹縣</option>
            <option value="桃園市">桃園市</option>
            <option value="宜蘭縣">宜蘭縣</option>
          </optgroup>
          <optgroup label="中部地區">
            <option value="臺中市">臺中市</option>
            <option value="苗栗縣">苗栗縣</option>
            <option value="彰化縣">彰化縣</option>
            <option value="南投縣">南投縣</option>
            <option value="雲林縣">雲林縣</option>
          </optgroup>
          <optgroup label="南部地區">
            <option value="高雄市">高雄市</option>
            <option value="臺南市">臺南市</option>
            <option value="嘉義市">嘉義市</option>
            <option value="嘉義縣">嘉義縣</option>
            <option value="屏東縣">屏東縣</option>
          </optgroup>
          <optgroup label="東部與離島">
            <option value="花蓮縣">花蓮縣</option>
            <option value="臺東縣">臺東縣</option>
            <option value="澎湖縣">澎湖縣</option>
            <option value="金門縣">金門縣</option>
            <option value="連江縣">連江縣</option>
          </optgroup>
        </select>
        <button type="submit">查詢天氣</button>
      </form>

      <div className="result-area">
        {loading && <p>讀取中...</p>}
        {weatherData && (
          <>
            <h3>{weatherData.locationName}</h3>
            <p className="forecast-time">{weatherData.timeString}</p>
            <div className="weather-display">
              <img src={weatherData.iconUrl} alt={weatherData.weatherState} className="weather-icon" />
              <div className="weather-state">{weatherData.weatherState}</div>
            </div>
            <div className="weather-info">
              <p><span>氣溫範圍</span> <strong>{weatherData.minTemp}°C - {weatherData.maxTemp}°C</strong></p>
              <p><span>降雨機率</span> <strong>{weatherData.pop}%</strong></p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default App