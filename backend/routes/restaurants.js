const express = require('express');
const router = express.Router();
const restaurantService = require('../services/restaurantApi');

// Search restaurants near coordinates
router.get('/', async (req, res) => {
    try {
        const { lat, lng, distance, cuisine } = req.query;

        if (!lat || !lng || !distance) {
            return res.status(400).json({ error: 'Missing required parameters: lat, lng, distance' });
        }

        const restaurants = await restaurantService.searchRestaurants(
            parseFloat(lat),
            parseFloat(lng),
            parseFloat(distance),
            cuisine
        );

        res.json(restaurants);
    } catch (error) {
        console.error('Error searching restaurants:', error);
        res.status(500).json({ error: 'Failed to search restaurants' });
    }
});

module.exports = router;