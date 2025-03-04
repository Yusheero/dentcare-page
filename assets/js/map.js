// Конфигурация карты
const MAP_CONFIG = {
  key: '40b06f9a-0098-450c-bc57-e8404d8699ca',
  center: [131.951802, 43.098111],
  zoom: 17
};

// Инициализация карты
function initMap() {
  const mapContainer = document.getElementById('map');
  
  if (!mapContainer) {
    console.error('Контейнер карты не найден');
    return;
  }

  if (typeof mapgl === 'undefined') {
    console.error('API 2GIS не загружено');
    mapContainer.innerHTML = '<p style="text-align: center; padding: 20px;">Извините, карта временно недоступна. Пожалуйста, воспользуйтесь прямой ссылкой на 2GIS.</p>';
    return;
  }

  try {
    const map = new mapgl.Map('map', MAP_CONFIG);
    
    // Добавление маркера
    new mapgl.Marker(map, {
      coordinates: MAP_CONFIG.center
    });

  } catch (error) {
    console.error('Ошибка при инициализации карты:', error);
    mapContainer.innerHTML = '<p style="text-align: center; padding: 20px;">Извините, карта временно недоступна. Пожалуйста, воспользуйтесь прямой ссылкой на 2GIS.</p>';
  }
}

// Инициализация карты после загрузки DOM и API
function loadMap() {
  if (typeof mapgl === 'undefined') {
    console.warn('API 2GIS не загружено');
    return;
  }

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

document.addEventListener('DOMContentLoaded', loadMap); 