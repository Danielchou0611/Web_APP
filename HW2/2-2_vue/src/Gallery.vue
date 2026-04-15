<template>
  <div class="gallery-wrapper">
    <header>
      <h1>響應式圖片畫廊</h1>
    </header>

    <main class="gallery-container">
      <div v-for="(item, index) in galleryData" :key="index" class="gallery-item">
        <img :src="item.url" :alt="item.alt">
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const galleryData = ref([
  { url: 'https://upload.wikimedia.org/wikipedia/sco/thumb/2/21/Nvidia_logo.svg/250px-Nvidia_logo.svg.png', alt: 'Nvidia' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Google_Favicon_2025.svg/1280px-Google_Favicon_2025.svg.png', alt: 'Google' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/2023_Facebook_icon.svg', alt: 'Facebook' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Tesla_logo.png/500px-Tesla_logo.png', alt: 'Tesla' },
  { url: 'https://upload.wikimedia.org/wikipedia/zh/thumb/b/bf/Starbucks_Coffee.svg/250px-Starbucks_Coffee.svg.png', alt: 'Starbucks' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/250px-Microsoft_logo_%282012%29.svg.png', alt: 'Microsoft' }
]);
</script>

<style scoped>
.gallery-wrapper {
  font-family: Arial, sans-serif;
  background-color: #f0f2f5;
  color: #333;
  text-align: center;
  min-height: 100vh;
}

header {
  padding: 30px 10px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
}

header h1 {
  font-size: 1.8rem;
  margin: 0;
}

.gallery-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
  width: 95%;
  max-width: 1000px; /* 這裡調整為 1000 */
  margin: 0 auto;
  box-sizing: border-box;
}

.gallery-item {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  padding: 12px;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s;
}

.gallery-item:hover {
  transform: translateY(-4px);
}

.gallery-item img {
  width: 100%;
  height: 200px; /* 這裡調整為 200 */
  object-fit: contain; 
  border-radius: 6px;
  background-color: #f8f8f8;
}

/* 響應式優化 */
@media screen and (max-width: 900px) {
  .gallery-container {
    grid-template-columns: repeat(2, 1fr); 
  }
}

@media screen and (max-width: 600px) {
  .gallery-container {
    grid-template-columns: repeat(1, 1fr); 
  }
  
  .gallery-item img {
    height: 180px;
  }
}
</style>