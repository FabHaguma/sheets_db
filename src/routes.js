const express = require('express');
const router = express.Router();
const controller = require('./controllers');
const { validateValues, validateSpreadsheetId, apiKeyAuth } = require('./middleware');

// Apply API key authentication to all routes
router.use(apiKeyAuth);

// Apply spreadsheet ID validation to all routes
router.use('/:spreadsheetId', validateSpreadsheetId);

// READ (with pagination support: ?page=1&limit=50)
router.get('/:spreadsheetId/:range', controller.readData);

// CREATE (Append)
router.post('/:spreadsheetId/:range', validateValues, controller.appendData);

// UPDATE
router.put('/:spreadsheetId/:range', validateValues, controller.updateData);
router.put('/:spreadsheetId/:sheetName/:value', validateValues, controller.updateDataByValue);

// DELETE
router.delete('/:spreadsheetId/:sheetName/:rowIndex', controller.deleteRow);

module.exports = router;
