<template>
  <div class="weather-container">
    <div class="card">
      <h2>台灣天氣預報</h2>
      
      <form class="weather-form" @submit.prevent="fetchWeather">
        <select v-model="selectedCity" required>
          <option value="" disabled>請選擇縣市</option>
          <optgroup v-for="(cities, region) in cityGroups" :key="region" :label="region">
            <option v-for="city in cities" :key="city" :value="city">
              {{ city }}
            </option>
          </optgroup>
        </select>
        <button type="submit" :disabled="loading">
          {{ loading ? '資料讀取中...' : '查詢天氣' }}
        </button>
      </form>

      <div v-if="weatherData" class="result-area">
        <h3>{{ weatherData.locationName }}</h3>
        <p class="forecast-time">{{ weatherData.timeString }}</p>
        
        <div class="weather-display">
          <img :src="weatherData.iconUrl" :alt="weatherData.state" class="weather-icon">
          <div class="weather-state">{{ weatherData.state }}</div>
        </div>

        <div class="weather-info">
          <p><span>氣溫範圍</span> <strong>{{ weatherData.minTemp }}°C - {{ weatherData.maxTemp }}°C</strong></p>
          <p><span>降雨機率</span> <strong>{{ weatherData.pop }}%</strong></p>
        </div>
      </div>

      <div v-if="error" class="result-area">
        <p class="error-msg">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const selectedCity = ref('');
const loading = ref(false);
const weatherData = ref(null);
const error = ref(null);

const API_KEY = 'CWA-42277493-253C-403D-A3DC-9F2591599633';

// 完整 22 縣市清單
const cityGroups = {
  '北部地區': ['臺北市', '新北市', '基隆市', '桃園市', '新竹市', '新竹縣', '宜蘭縣'],
  '中部地區': ['臺中市', '苗栗縣', '彰化縣', '南投縣', '雲林縣'],
  '南部地區': ['高雄市', '臺南市', '嘉義市', '嘉義縣', '屏東縣'],
  '東部地區': ['花蓮縣', '臺東縣'],
  '離島地區': ['澎湖縣', '金門縣', '連江縣']
};

const fetchWeather = async () => {
  if (!selectedCity.value) return;

  loading.value = true;
  error.value = null;
  // 查詢新城市時，先保留舊資料或清空視需求，這裡選擇先清空讓使用者知道在更新
  weatherData.value = null; 
  
  try {
    const url = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${API_KEY}&locationName=${encodeURIComponent(selectedCity.value)}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.success === 'true' && data.records.location.length > 0) {
      const location = data.records.location[0];
      const elements = location.weatherElement;
      
      // 提取核心天氣元素
      const wx = elements.find(el => el.elementName === 'Wx').time[0];
      const minT = elements.find(el => el.elementName === 'MinT').time[0];
      const maxT = elements.find(el => el.elementName === 'MaxT').time[0];
      const pop = elements.find(el => el.elementName === 'PoP').time[0];

      const startTime = new Date(wx.startTime);

      weatherData.value = {
        locationName: location.locationName,
        state: wx.parameter.parameterName,
        iconUrl: `https://www.cwa.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/${wx.parameter.parameterValue.padStart(2, '0')}.svg`,
        timeString: `${startTime.getMonth() + 1}/${startTime.getDate()} ${startTime.getHours().toString().padStart(2, '0')}:00 預報`,
        minTemp: minT.parameter.parameterName,
        maxTemp: maxT.parameter.parameterName,
        pop: pop.parameter.parameterName
      };
    } else {
      error.value = `抱歉，找不到 ${selectedCity.value} 的資料。`;
    }
  } catch (err) {
    console.error(err);
    error.value = '網路連線異常，請稍後再試。';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
@import "./style.css";
</style>