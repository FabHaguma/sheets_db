require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const routes = require('./src/routes');
const { errorHandler } = require('./src/middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Rate limiting: 100 requests per minute
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: { success: false, error: 'Too many requests, please try again later.' }
});

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());

// Apply rate limiting to API routes
app.use('/api/sheets', limiter);

// API Prefix
app.use('/api/sheets', routes);

// Root endpoint
app.get('/', (req, res) => {
  res.send('Google Sheets DB API is running.');
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Centralized error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
