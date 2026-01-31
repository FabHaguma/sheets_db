/**
 * Validates that request body contains proper 'values' array
 */
function validateValues(req, res, next) {
  const { values } = req.body;

  if (!values) {
    return res.status(400).json({ success: false, error: 'Missing "values" in request body' });
  }

  if (!Array.isArray(values) || !values.every(Array.isArray)) {
    return res.status(400).json({ success: false, error: '"values" must be a 2D array' });
  }

  next();
}

/**
 * Validates that spreadsheetId is present and has a reasonable format
 */
function validateSpreadsheetId(req, res, next) {
  const { spreadsheetId } = req.params;

  // Google Sheet IDs are typically 44 characters
  if (!spreadsheetId || spreadsheetId.length < 20) {
    return res.status(400).json({ success: false, error: 'Invalid spreadsheet ID' });
  }

  next();
}

/**
 * Validates that range parameter is present
 */
function validateRange(req, res, next) {
  const { range } = req.params;

  if (!range) {
    return res.status(400).json({ success: false, error: 'Missing range parameter' });
  }

  next();
}

module.exports = {
  validateValues,
  validateSpreadsheetId,
  validateRange,
};
