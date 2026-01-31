/**
 * Centralized error handling middleware
 * Handles Google API specific errors and provides consistent error responses
 */
function errorHandler(err, req, res, next) {
  console.error(`[${new Date().toISOString()}] Error:`, err.message);

  // Handle Google API specific errors
  if (err.code === 404) {
    return res.status(404).json({ success: false, error: 'Spreadsheet or sheet not found' });
  }

  if (err.code === 403) {
    return res.status(403).json({ success: false, error: 'Permission denied. Check sheet sharing settings.' });
  }

  if (err.code === 400) {
    return res.status(400).json({ success: false, error: 'Bad request. Check your parameters.' });
  }

  if (err.code === 429) {
    return res.status(429).json({ success: false, error: 'Rate limit exceeded. Please try again later.' });
  }

  res.status(500).json({ success: false, error: 'Internal server error' });
}

module.exports = {
  errorHandler,
};
