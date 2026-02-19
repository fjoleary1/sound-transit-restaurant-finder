// API Configuration
const API_BASE = 'http://localhost:3000/api';

// Map instance
let map;
let currentStationMarker = null;
let restaurantMarkers = new Map();

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initializeMap();
    loadStations();
    setupEventListeners();
});

// Initialize Leaflet map centered on Seattle
function initializeMap() {
    map = L.map('map').setView([47.6062, -122.3321], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);
}

// Load all Sound Transit Link stations
async function loadStations() {
    try {
        const response = await fetch(`${API_BASE}/stations`);
        const stations = await response.json();
        
        const stationSelect = document.getElementById('station-select');
        
        stations.forEach(station => {
            const option = document.createElement('option');
            option.value = JSON.stringify(station);
            option.textContent = station.name;
            stationSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading stations:', error);
        alert('Failed to load stations. Please try again.');
    }
}

// Setup event listeners
function setupEventListeners() {
    const searchBtn = document.getElementById('search-btn');
    const resetBtn = document.getElementById('reset-btn');
    const stationSelect = document.getElementById('station-select');
    const distanceSlider = document.getElementById('distance-slider');
    const distanceDisplay = document.getElementById('distance-display');

    searchBtn.addEventListener('click', searchRestaurants);
    resetBtn.addEventListener('click', resetSearch);
    stationSelect.addEventListener('change', onStationChange);
    distanceSlider.addEventListener('input', (e) => {
        distanceDisplay.textContent = `${e.target.value} mi`;
    });
}

// Handle station selection
function onStationChange(event) {
    const selectedValue = event.target.value;
    
    if (!selectedValue) {
        clearMarkers();
        return;
    }

    const station = JSON.parse(selectedValue);
    clearMarkers();
    
    // Add station marker
    currentStationMarker = L.marker([station.latitude, station.longitude], {
        icon: L.icon({
            iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjNjY3ZWVhIiBkPSJNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptMCA5Yy0wLjU1IDAtMS0wLjQ1LTEtMXMwLjQ1LTEgMS0xIDEgMC40NSAxIDEtMC40NSAxLTEgMXoiLz48L3N2Zz4=',$
            iconSize: [32, 32],
            iconAnchor: [16, 32]
        })
    }).addTo(map).bindPopup(`<b>${station.name}</b><br/>Station`);

    // Center map on station
    map.setView([station.latitude, station.longitude], 15);
}

// Search for restaurants near selected station
async function searchRestaurants() {
    const stationSelect = document.getElementById('station-select');
    const distanceSlider = document.getElementById('distance-slider');
    const cuisineFilter = document.getElementById('cuisine-filter');
    const loading = document.getElementById('loading');

    if (!stationSelect.value) {
        alert('Please select a station first');
        return;
    }

    const station = JSON.parse(stationSelect.value);
    const distance = parseFloat(distanceSlider.value);
    const cuisine = cuisineFilter.value;

    loading.classList.remove('hidden');

    try {
        const params = new URLSearchParams({
            lat: station.latitude,
            lng: station.longitude,
            distance: distance,
            ...(cuisine && { cuisine })
        });

        const response = await fetch(`${API_BASE}/restaurants?${params}`);
        const restaurants = await response.json();

        displayRestaurants(restaurants, station);
        displayResults(restaurants);
    } catch (error) {
        console.error('Error searching restaurants:', error);
        alert('Failed to search restaurants. Please try again.');
    } finally {
        loading.classList.add('hidden');
    }
}

// Display restaurants on the map
function displayRestaurants(restaurants, station) {
    clearRestaurantMarkers();

    restaurants.forEach(restaurant => {
        const marker = L.marker([restaurant.latitude, restaurant.longitude], {
            icon: L.icon({
                iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjZjU0MzQ2IiBkPSJNMTkgMyBINWMtMS4xIDAtMiAuOS0yIDJ2MTRjMCAxLjEuOSAyIDIgMmgxNGMxLjEgMCAyLS45IDItMlY1YzAtMS4xLS45LTItMi0yem0wIDE2SDS2di0xMGgxNHYxMHoiLz48L3N2Zz4=',$
                iconSize: [32, 32],
                iconAnchor: [16, 32]
            })
        }).addTo(map);

        const popupContent = `
            <b>${restaurant.name}</b><br/>
            ${restaurant.cuisine}<br/>
            ${restaurant.address}<br/>
            <strong>Rating:</strong> ${restaurant.rating || 'N/A'}<br/>
            <strong>Distance:</strong> ${restaurant.distance.toFixed(2)} mi
        `;

        marker.bindPopup(popupContent);
        restaurantMarkers.set(restaurant.id, marker);
    });
}

// Display search results in sidebar
function displayResults(restaurants) {
    const resultsList = document.getElementById('results-list');
    resultsList.innerHTML = '';

    if (restaurants.length === 0) {
        resultsList.innerHTML = '<p class="placeholder">No restaurants found in this area</p>';
        return;
    }

    restaurants.forEach(restaurant => {
        const card = document.createElement('div');
        card.className = 'restaurant-card';
        
        const ratingStars = restaurant.rating ? '⭐'.repeat(Math.round(restaurant.rating)) : 'N/A';
        
        card.innerHTML = `
            <h4>${restaurant.name}</h4>
            <p><strong>${restaurant.address}</strong></p>
            <p>${restaurant.phone || 'No phone available'}</p>
            <p><strong>Rating:</strong> ${ratingStars}</p>
            <span class="cuisine">${restaurant.cuisine}</span>
            <p class="distance">📍 ${restaurant.distance.toFixed(2)} miles away</p>
        `;
        
        card.addEventListener('click', () => {
            const marker = restaurantMarkers.get(restaurant.id);
            if (marker) {
                marker.openPopup();
                map.setView(marker.getLatLng(), 17);
            }
        });
        
        resultsList.appendChild(card);
    });
}

// Reset search
function resetSearch() {
    document.getElementById('station-select').value = '';
    document.getElementById('cuisine-filter').value = '';
    document.getElementById('distance-slider').value = '0.5';
    document.getElementById('distance-display').textContent = '0.5 mi';
    document.getElementById('results-list').innerHTML = '<p class="placeholder">Select a station and search to see results</p>';
    clearMarkers();
    map.setView([47.6062, -122.3321], 13);
}

// Clear all markers
function clearMarkers() {
    if (currentStationMarker) {
        map.removeLayer(currentStationMarker);
        currentStationMarker = null;
    }
    clearRestaurantMarkers();
}

// Clear restaurant markers
function clearRestaurantMarkers() {
    restaurantMarkers.forEach(marker => {
        map.removeLayer(marker);
    });
    restaurantMarkers.clear();
}