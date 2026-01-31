const { getSheetsClient } = require('./auth');
const { getSheetId } = require('./utils');

// GET: Read data from a range
// Route: GET /:spreadsheetId/:range
async function readData(req, res) {
  try {
    const { spreadsheetId, range } = req.params;
    const sheets = await getSheetsClient();

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    res.json({
      success: true,
      data: response.data.values,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// POST: Append data (Add new row)
// Route: POST /:spreadsheetId/:range 
// Body: { values: [ ["val1", "val2"] ] }
async function appendData(req, res) {
  try {
    const { spreadsheetId, range } = req.params;
    const { values } = req.body;
    const sheets = await getSheetsClient();

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values,
      },
    });

    res.json({
      success: true,
      updates: response.data.updates,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// PUT: Update data in a range
// Route: PUT /:spreadsheetId/:range
// Body: { values: [ ["newVal"] ] }
async function updateData(req, res) {
  try {
    const { spreadsheetId, range } = req.params;
    const { values } = req.body;
    const sheets = await getSheetsClient();

    const response = await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values,
      },
    });

    res.json({
      success: true,
      updates: response.data,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// DELETE: Remove an entire row
// Route: DELETE /:spreadsheetId/:sheetName/:rowIndex
// Note: If 'column' query param is provided, rowIndex acts as the value to search for.
//       Otherwise, rowIndex is expected to be the 1-based row number.
async function deleteRow(req, res) {
  try {
    const { spreadsheetId, sheetName, rowIndex } = req.params;
    const { column } = req.query; // e.g. 'A', 'Email'
    const sheets = await getSheetsClient();
    
    let rowToDelete;

    // 1. SEARCH MODE: If a column is specified, find the row by value
    if (column) {
      const readResponse = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `${sheetName}!${column}:${column}`, // Fetch entire column
      });

      const rows = readResponse.data.values || [];
      // Find index where the cell matches our value (rowIndex from params acts as the value here)
      // Note: rows is an array of arrays, e.g. [ ['id'], ['123'], ['456'] ]
      const foundIndex = rows.findIndex(r => r && r[0] == rowIndex);

      if (foundIndex === -1) {
        return res.status(404).json({ success: false, error: `Value '${rowIndex}' not found in column ${column}` });
      }
      
      // Found index + 1 because Sheets API uses 1-based indexing for the next visual steps 
      // (though the internal dimension index is 0-based, we standardize to 1-based logic below).
      rowToDelete = foundIndex + 1; 

    } else {
      // 2. DIRECT MODE: Use the parameter as a physical row number
      rowToDelete = parseInt(rowIndex);
    }

    if (isNaN(rowToDelete) || rowToDelete < 1) {
      return res.status(400).json({ success: false, error: 'Invalid row index or lookup value' });
    }

    const sheetId = await getSheetId(sheets, spreadsheetId, sheetName);

    // GridRange uses 0-based index. 
    // To delete Row 1, startIndex is 0, endIndex is 1.
    const request = {
      deleteDimension: {
        range: {
          sheetId: sheetId,
          dimension: 'ROWS',
          startIndex: rowToDelete - 1,
          endIndex: rowToDelete,
        },
      },
    };

    const response = await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      resource: {
        requests: [request],
      },
    });

    res.json({
      success: true,
      message: `Row ${rowToDelete} deleted from ${sheetName}`,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = {
  readData,
  appendData,
  updateData,
  deleteRow,
};
