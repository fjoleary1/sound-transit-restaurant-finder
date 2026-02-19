const express = require('express');
const router = express.Router();

// Sound Transit Link Stations (with coordinates)
const STATIONS = [
    { id: 1, name: 'Northgate Station', latitude: 47.6568, longitude: -122.3254 },
    { id: 2, name: 'U-District Station', latitude: 47.6553, longitude: -122.3035 },
    { id: 3, name: 'University of Washington Station', latitude: 47.6564, longitude: -122.3050 },
    { id: 4, name: 'Capitol Hill Station', latitude: 47.6205, longitude: -122.3212 },
    { id: 5, name: 'Westlake Station', latitude: 47.6113, longitude: -122.3371 },
    { id: 6, name: 'University Street Station', latitude: 47.6078, longitude: -122.3331 },
    { id: 7, name: 'Pioneer Square Station', latitude: 47.6021, longitude: -122.3296 },
    { id: 8, name: 'International District Station', latitude: 47.5972, longitude: -122.3277 },
    { id: 9, name: 'Beacon Hill Station', latitude: 47.5809, longitude: -122.3121 },
    { id: 10, name: 'Othello Station', latitude: 47.5556, longitude: -122.2963 },
    { id: 11, name: 'Rainier Avenue Station', latitude: 47.5228, longitude: -122.2739 },
    { id: 12, name: 'SeaTac/Airport Station', latitude: 47.4502, longitude: -122.3088 }
];

// Get all stations
router.get('/', (req, res) => {
    res.json(STATIONS);
});

// Get specific station
router.get('/:id', (req, res) => {
    const station = STATIONS.find(s => s.id === parseInt(req.params.id));
    if (!station) {
        return res.status(404).json({ error: 'Station not found' });
    }
    res.json(station);
});

module.exports = router;