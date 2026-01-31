const { google } = require('googleapis');
const path = require('path');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

// Assuming service_account.json is in the root of the project
const KEY_FILE_PATH = path.join(__dirname, '../service_account.json');

const auth = new google.auth.GoogleAuth({
  keyFile: KEY_FILE_PATH,
  scopes: SCOPES,
});

async function getSheetsClient() {
  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });
  return sheets;
}

module.exports = {
  getSheetsClient,
};
