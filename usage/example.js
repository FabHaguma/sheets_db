// const fetch = require('node-fetch'); // Uncomment if using Node.js < 18

const BASE_URL = 'https://sheetsdb.haguma.com/api/sheets';
const SPREADSHEET_ID = '1ZFJWCFmbQpeuSRaL67jzGek112wquKdIJL0xf4H3MyU';
const SHEET_NAME = 'Sheet1';

/**
 * 1. Read Data (GET)
 * Retrieves values from a specific range.
 */
async function readData(range = 'A1:J100') {
  const url = `${BASE_URL}/${SPREADSHEET_ID}/${SHEET_NAME}!${range}`;
  console.log(`GET ${url}`);
  
  const response = await fetch(url);
  const data = await response.json();
  console.log('Read Data:', data);
  return data;
}

/**
 * 1b. Read Data with Pagination (GET)
 * Retrieves paginated values.
 */
async function readDataPaginated(page = 1, limit = 10) {
  const range = 'A1:J100'; // Define the full scope
  const url = `${BASE_URL}/${SPREADSHEET_ID}/${SHEET_NAME}!${range}?page=${page}&limit=${limit}`;
  console.log(`GET ${url}`);

  const response = await fetch(url);
  const data = await response.json();
  console.log('Paginated Data:', data);
  return data;
}

/**
 * 2. Append Data (POST)
 * Appends a new row to the sheet.
 * Body expects: { "values": [ ["col1", "col2", ...] ] }
 */
async function appendData(newRowArray) {
  // Use range 'A1' or just sheet name to append to the bottom
  const url = `${BASE_URL}/${SPREADSHEET_ID}/${SHEET_NAME}!A1`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      values: [newRowArray]
    })
  });
  
  const result = await response.json();
  console.log('Append Result:', result);
}

/**
 * 3. Update Data by Range (PUT)
 * Updates specific cells.
 */
async function updateByRange(range, newValues) {
  const url = `${BASE_URL}/${SPREADSHEET_ID}/${SHEET_NAME}!${range}`;
  
  const response = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      values: newValues // Array of Arrays
    })
  });
  
  const result = await response.json();
  console.log('Update by Range Result:', result);
}

/**
 * 3b. Update Data by Value Search (PUT)
 * Searches a column for a specific value and updates that row.
 * Useful for "Update User where Email = x" scenarios.
 */
async function updateByValue(searchValue, searchColumn, newRowValues) {
  // Example: /api/sheets/.../alice@example.com?column=B
  const url = `${BASE_URL}/${SPREADSHEET_ID}/${SHEET_NAME}/${encodeURIComponent(searchValue)}?column=${searchColumn}`;
  
  const response = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      values: [newRowValues]
    })
  });
  
  const result = await response.json();
  console.log('Update by Value Result:', result);
}

/**
 * 4. Delete Data by Value (DELETE)
 * Searches a column for a value and deletes the row (Shift Up).
 */
async function deleteByValue(searchValue, searchColumn) {
  const url = `${BASE_URL}/${SPREADSHEET_ID}/${SHEET_NAME}/${encodeURIComponent(searchValue)}?column=${searchColumn}`;
  
  const response = await fetch(url, {
    method: 'DELETE'
  });
  
  const result = await response.json();
  console.log('Delete by Value Result:', result);
}

/**
 * 5. Delete Data by Row Index (DELETE)
 * Deletes a physical row number (1-based).
 */
async function deleteByRowIndex(rowIndex) {
  const url = `${BASE_URL}/${SPREADSHEET_ID}/${SHEET_NAME}/${rowIndex}`;
  
  const response = await fetch(url, {
    method: 'DELETE'
  });
  
  const result = await response.json();
  console.log('Delete by Index Result:', result);
}

// --- Usage Examples ---
(async () => {
    /*
    await readData();
    await appendData(["John Doe", "john@example.com", "Active"]);
    await updateByValue("john@example.com", "B", ["John Updated", "john@example.com", "Inactive"]);
    await deleteByValue("john@example.com", "B");
    */
})();
