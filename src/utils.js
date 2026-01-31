async function getSheetId(sheetsClient, spreadsheetId, sheetName) {
  const request = {
    spreadsheetId,
    includeGridData: false,
  };

  try {
    const response = await sheetsClient.spreadsheets.get(request);
    const sheets = response.data.sheets;
    const sheet = sheets.find(s => s.properties.title === sheetName);
    
    if (!sheet) {
      throw new Error(`Sheet with name "${sheetName}" not found.`);
    }
    
    return sheet.properties.sheetId;
  } catch (error) {
    console.error('Error fetching sheet ID:', error);
    throw error;
  }
}

module.exports = {
  getSheetId,
};
