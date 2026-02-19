# Sound Transit Link Restaurant Finder

A web application that helps you discover restaurants near Sound Transit Link light rail stations in Seattle.

## Features

- 🚇 Browse all Sound Transit Link stations
- 🍽️ Find nearby restaurants with real-time distance calculation
- 🗺️ Interactive map view of stations and restaurants
- 🔍 Filter by cuisine type and search radius
- ⭐ View restaurant ratings and contact information
- 📱 Responsive design for desktop and mobile

## Tech Stack

**Frontend:**
- HTML5
- CSS3
- Vanilla JavaScript
- Leaflet.js for mapping

**Backend:**
- Node.js
- Express.js
- CORS enabled

## Getting Started

### Installation

1. Clone the repository
```bash
git clone https://github.com/fjoleary1/sound-transit-restaurant-finder.git
cd sound-transit-restaurant-finder
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

### Running Locally

**Start the backend server:**
```bash
npm run dev
```

**In another terminal, serve the frontend:**
```bash
npm run serve
```

Then open `http://localhost:8000` in your browser.

## API Endpoints

### Stations
- `GET /api/stations` - Get all Sound Transit Link stations
- `GET /api/stations/:id` - Get specific station details

### Restaurants
- `GET /api/restaurants?lat=47.6&lng=-122.3&distance=0.5&cuisine=asian` - Search restaurants

## Future Enhancements

- [ ] Integration with Google Places API for real restaurant data
- [ ] User reviews and ratings integration
- [ ] Reservation booking system
- [ ] Opening hours and hours of operation
- [ ] Menu previews
- [ ] User favorites/bookmarks
- [ ] Route planning to restaurants from stations
- [ ] Real-time transit information

## Production Deployment

For production, integrate with:
1. **Google Places API** or **Yelp Fusion API** for real restaurant data
2. **Transit agency API** for real-time station and schedule information
3. **Database** to cache results and improve performance

## License

MIT

## Contributing

Pull requests are welcome!