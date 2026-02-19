// This service integrates with Google Places API or Yelp API
// For demo purposes, we're using mock data

const MOCK_RESTAURANTS = [
    {
        id: '1',
        name: 'The Walrus and the Carpenter',
        latitude: 47.6068,
        longitude: -122.3350,
        address: '1427 Post Alley, Seattle, WA 98101',
        phone: '(206) 398-4000',
        cuisine: 'Seafood',
        rating: 4.5,
        distance: 0.2
    },
    {
        id: '2',
        name: 'Biscuit Beignes',
        latitude: 47.6070,
        longitude: -122.3380,
        address: '1530 Melrose Ave E, Seattle, WA 98122',
        phone: '(206) 323-0350',
        cuisine: 'American',
        rating: 4.3,
        distance: 0.3
    },
    {
        id: '3',
        name: 'Taneda Sushi',
        latitude: 47.6200,
        longitude: -122.3215,
        address: '609 Pine St, Seattle, WA 98101',
        phone: '(206) 621-1950',
        cuisine: 'Asian',
        rating: 4.6,
        distance: 0.4
    },
    {
        id: '4',
        name: 'Spinasse',
        latitude: 47.6090,
        longitude: -122.3320,
        address: '719 Pine St, Seattle, WA 98101',
        phone: '(206) 624-6066',
        cuisine: 'Italian',
        rating: 4.4,
        distance: 0.1
    },
    {
        id: '5',
        name: 'Foundation',
        latitude: 47.6050,
        longitude: -122.3290,
        address: '117 S Main St, Seattle, WA 98104',
        phone: '(206) 682-0541',
        cuisine: 'American',
        rating: 4.2,
        distance: 0.25
    },
    {
        id: '6',
        name: 'Vegetarian Thai',
        latitude: 47.6150,
        longitude: -122.3280,
        address: '101 Pike Pl, Seattle, WA 98101',
        phone: '(206) 448-7515',
        cuisine: 'Vegan/Vegetarian',
        rating: 4.1,
        distance: 0.35
    },
    {
        id: '7',
        name: 'Café Vita',
        latitude: 47.6080,
        longitude: -122.3365,
        address: '813 5th Ave S, Seattle, WA 98134',
        phone: '(206) 329-2829',
        cuisine: 'Cafe/Coffee',
        rating: 4.0,
        distance: 0.2
    }
];

async function searchRestaurants(latitude, longitude, distanceMiles, cuisine) {
    // Mock implementation - in production, use Google Places API or Yelp
    // Example: https://maps.googleapis.com/maps/api/place/nearbysearch/json
    
    let results = MOCK_RESTAURANTS.filter(restaurant => {
        const distance = calculateDistance(latitude, longitude, restaurant.latitude, restaurant.longitude);
        restaurant.distance = distance;
        return distance <= distanceMiles;
    });

    if (cuisine) {
        results = results.filter(r => r.cuisine.toLowerCase().includes(cuisine.toLowerCase()));
    }

    return results.sort((a, b) => a.distance - b.distance);
}

// Haversine formula to calculate distance between two coordinates
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 3959; // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

module.exports = {
    searchRestaurants
};