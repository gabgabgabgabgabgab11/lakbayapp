const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

let routes = [];
let jeepneyLocation = null;

// Save a new route (supports multiple) -- now saves both waypoints and snapped route
app.post('/api/routes', (req, res) => {
  const { route, waypoints } = req.body;
  if (Array.isArray(route) && route.length > 1 && Array.isArray(waypoints) && waypoints.length > 1) {
    routes.push({ route, waypoints });
    res.status(201).json({ success: true, message: "Route saved.", route, waypoints });
  } else {
    res.status(400).json({ error: 'Route and waypoints must have at least 2 points each' });
  }
});

// Get all saved routes
app.get('/api/routes', (req, res) => {
  res.json(routes);
});

// Delete a specific route by index
app.delete('/api/routes/:index', (req, res) => {
  const idx = parseInt(req.params.index, 10);
  if (!isNaN(idx) && idx >= 0 && idx < routes.length) {
    routes.splice(idx, 1);
    res.json({ success: true, message: `Route ${idx} deleted.` });
  } else {
    res.status(404).json({ error: "Route index not found." });
  }
});

// Save jeepney location (for live tracking)
app.post('/api/jeepney-location', (req, res) => {
  const { lat, lng } = req.body;
  if (typeof lat === 'number' && typeof lng === 'number') {
    jeepneyLocation = { lat, lng };
    res.status(201).json({ success: true });
  } else {
    res.status(400).json({ error: 'Invalid location format' });
  }
});

// Get jeepney location
app.get('/api/jeepney-location', (req, res) => {
  res.json({ location: jeepneyLocation });
});

// Optionally: Clear all routes (for dev/demo)
app.delete('/api/routes', (req, res) => {
  routes = [];
  res.json({ success: true, message: 'All routes cleared.' });
});

app.listen(PORT, () => console.log(`Lakbay running at http://localhost:${PORT}`));