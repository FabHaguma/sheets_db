const express = require('express');
const router = express.Router();
const controller = require('./controllers');

// READ
router.get('/:spreadsheetId/:range', controller.readData);

// CREATE (Append)
router.post('/:spreadsheetId/:range', controller.appendData);

// UPDATE
router.put('/:spreadsheetId/:range', controller.updateData);

// DELETE
router.delete('/:spreadsheetId/:sheetName/:rowIndex', controller.deleteRow);

module.exports = router;
