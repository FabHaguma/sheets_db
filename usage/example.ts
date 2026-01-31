// Ensure you have a fetch polyfill or Node 18+
// npm install node-fetch (if needed) or just run with modern Node

const BASE_URL = 'https://sheetsdb.haguma.com/api/sheets';
const SPREADSHEET_ID = '1ZFJWCFmbQpeuSRaL67jzGek112wquKdIJL0xf4H3MyU';
const SHEET_NAME = 'Sheet1';

interface SheetResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  updates?: any;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

async function fetchJson<T>(url: string, options?: RequestInit): Promise<SheetResponse<T>> {
  const res = await fetch(url, options);
  return await res.json() as SheetResponse<T>;
}

/**
 * 1. Read Data (GET)
 */
async function readData(range: string = 'A1:J100'): Promise<void> {
  const url = `${BASE_URL}/${SPREADSHEET_ID}/${SHEET_NAME}!${range}`;
  const data = await fetchJson<string[][]>(url);
  console.log('Read Data:', data);
}

/**
 * 2. Append Data (POST)
 */
async function appendData(values: string[]): Promise<void> {
  const url = `${BASE_URL}/${SPREADSHEET_ID}/${SHEET_NAME}!A1`;
  const res = await fetchJson(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ values: [values] })
  });
  console.log('Append:', res);
}

/**
 * 3. Update Data by Value (PUT)
 * Example: Update row where Column B matches 'email@test.com'
 */
async function updateByValue(email: string, newRow: string[]): Promise<void> {
  const url = `${BASE_URL}/${SPREADSHEET_ID}/${SHEET_NAME}/${email}?column=B`;
  const res = await fetchJson(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ values: [newRow] })
  });
  console.log('Update:', res);
}

// Example Usage
// readData();
// appendData(['TS User', 'ts@example.com']);
