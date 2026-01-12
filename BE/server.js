import express from 'express';
import cors from 'cors';
import locationRoutes from './routes/locationRoutes.js';
import locationTypeRoutes from './routes/locationTypeRoutes.js';
import tripScheduleRoutes from './routes/tripScheduleRoutes.js';

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/locations', locationRoutes);
app.use('/api/location-types', locationTypeRoutes);
app.use('/api/trip-schedules', tripScheduleRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Food App Backend is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

