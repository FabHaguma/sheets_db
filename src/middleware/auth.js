/**
 * API Key authentication middleware
 * Checks for x-api-key header if API_KEY environment variable is set
 */
function apiKeyAuth(req, res, next) {
  const apiKey = req.headers['x-api-key'];

  // Skip authentication if no API key is configured
  if (!process.env.API_KEY) {
    return next();
  }

  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ success: false, error: 'Invalid or missing API key' });
  }

  next();
}

module.exports = {
  apiKeyAuth,
};
