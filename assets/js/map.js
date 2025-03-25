// Конфигурация карты
const MAP_CONFIG = {
  center: [43.098111, 131.951802], // Обратите внимание на порядок координат: [широта, долгота]
  zoom: 17,
  key: '40b06f9a-0098-450c-bc57-e8404d8699ca'
};

// Инициализация карты
function initMap() {
  const mapContainer = document.getElementById('map');
  
  if (!mapContainer) {
    console.error('Контейнер карты не найден');
    return;
  }

  try {
    // Инициализация RasterJS API
    DG.then(function() {
      // Создание растровой карты
      const map = DG.map('map', {
        center: MAP_CONFIG.center,
        zoom: MAP_CONFIG.zoom,
      });
      
      // Добавление маркера на карту
      DG.marker(MAP_CONFIG.center).addTo(map);
    });
  } catch (error) {
    console.error('Ошибка при инициализации карты:', error);
    mapContainer.innerHTML = '<p style="text-align: center; padding: 20px;">Извините, карта временно недоступна. Пожалуйста, воспользуйтесь прямой ссылкой на 2GIS.</p>';
  }
}

// Загрузка карты после видимости контейнера
function loadMap() {
  // Проверяем видимость контейнера карты
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        initMap();
        observer.disconnect();
      }
    });
  });

  const mapContainer = document.getElementById('map');
  if (mapContainer) {
    observer.observe(mapContainer);
  }
}

// Инициализация после загрузки DOM
document.addEventListener('DOMContentLoaded', loadMap); 