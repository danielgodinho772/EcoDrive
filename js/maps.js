try {
  console.log('Iniciando o mapa Leaflet...');
  document.getElementById('map').style.background = '#b6fcb6';

  const map = L.map('map', {
    zoomControl: false,
    attributionControl: false
  }).setView([-23.420999, -51.933056], 13);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '',
    minZoom: 1,
    maxZoom: 19
  }).addTo(map);

  const minimalRedIcon = L.icon({
    iconUrl: '/js/marker-red-minimal.svg',
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -40]
  });

  let userMarker = L.circleMarker([-23.420999, -51.933056], {
    radius: 10,
    color: '#d32f2f',
    fillColor: '#d32f2f',
    fillOpacity: 1,
    weight: 2
  }).addTo(map);

  map.on('click', function(e) {
    userMarker.setLatLng(e.latlng);
    showCollectorsPanel();
  });

  function showCollectorsPanel() {
    const panel = document.getElementById('collectors-panel');
    if (panel) {
      panel.style.display = 'flex';
    }
  }

  map.on('click', function(e) {
    showCollectorsPanel();
  });

  async function reverseGeocode(lat, lng) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
    const response = await fetch(url);
    if (!response.ok) return '';
    const data = await response.json();
    return data.display_name || '';
  }

  async function geocodeAddress(address) {
    const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(address)}`;
    const response = await fetch(url);
    if (!response.ok) return null;
    const data = await response.json();
    if (data.length > 0) return data[0];
    return null;
  }

  map.on('click', async function(e) {
    userMarker.setLatLng(e.latlng);
    showCollectorsPanel();
    const input = document.querySelector('.search-input');
    if (input) {
      input.value = 'Buscando endereço...';
      const address = await reverseGeocode(e.latlng.lat, e.latlng.lng);
      input.value = address || '';
    }
  });

  const searchForm = document.querySelector('.search-container');
  if (searchForm) {
    searchForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const input = searchForm.querySelector('.search-input');
      if (!input) return;
      const address = input.value.trim();
      if (!address) return;
      input.value = 'Buscando localização...';
      const result = await geocodeAddress(address);
      if (result) {
        const latlng = [parseFloat(result.lat), parseFloat(result.lon)];
        map.setView(latlng, 15);
        userMarker.setLatLng(latlng);
        input.value = result.display_name || address;
        showCollectorsPanel();
      } else {
        input.value = '';
        alert('Endereço não encontrado.');
      }
    });
  }

  const homeBtn = document.querySelector('.navigation-bar .nav-segment[aria-label="Home"]');
  if (homeBtn) {
    homeBtn.addEventListener('click', function() {
      window.location.href = 'home-page.html';
    });
  }
} catch (e) {
  document.getElementById('map').style.background = '#ffb6b6';
  console.error('Erro ao carregar o mapa Leaflet:', e);
}
