# Google Sheets as a Database API

This Node.js/Express application creates a RESTful API that allows you to perform CRUD (Create, Read, Update, Delete) operations on Google Sheets. It uses a Service Account for authentication.

## Prerequisites

1.  **Node.js**: Ensure Node.js is installed.
2.  **Google Cloud Platform Project**:
    *   Enable the **Google Sheets API**.
    *   Create a **Service Account**.
    *   Download the JSON key file for the service account.
    *   Rename the key file to `service_account.json` and place it in the **root** of this project.
    *   **Share your Google Sheet** with the email address found in `service_account.json` (e.g., `sheet-editor@project-id.iam.gserviceaccount.com`) giving it **Editor** access.

## Installation

1.  Clone the repository or download the source code.
2.  Navigate to the project folder.
3.  Install dependencies:
    ```bash
    npm install
    ```

## Usage

1.  Start the server:
    ```bash
    node index.js
    ```
2.  The server typically runs on `http://localhost:3000`.

## API Endpoints

Base URL: `/api/sheets`

### 1. Read Data (GET)
Retrieves values from a specific range.

*   **URL:** `/:spreadsheetId/:range`
*   **Method:** `GET`
*   **Example:** `GET /api/sheets/1xB7...ID/Sheet1!A1:C10`

### 2. Append Data (POST)
Adds a new row of data to the sheet.

*   **URL:** `/:spreadsheetId/:range`
*   **Method:** `POST`
*   **Body:**
    ```json
    {
      "values": [
        ["John Doe", "john@example.com", "Active"]
      ]
    }
    ```

### 3. Update Data (PUT)
Updates data in a specific range or by searching for a row based on a value.

#### Option A: Update by Range (Direct)
Updates data starting at a specific cell location.

*   **URL:** `/:spreadsheetId/:range`
*   **Method:** `PUT`
*   **Body:**
    ```json
    {
      "values": [
        ["Updated Name", "updated@example.com"]
      ]
    }
    ```

#### Option B: Update by Value (Search)
Searches for a value in a column to identify the row, then updates that row (starting at column A).

*   **URL:** `/:spreadsheetId/:sheetName/:value?column=ColumnLetter`
*   **Method:** `PUT`
*   **Query Param:** `column` - The column letter to search in.
*   **Body:**
    ```json
    {
      "values": [
        ["Updated Name", "updated@example.com"]
      ]
    }
    ```
*   **Example:** `PUT /api/sheets/1xB7...ID/Sheet1/john@example.com?column=B`

### 4. Delete Data (DELETE)
Deletes an entire row. Can be done by physical row number OR by searching for a value in a column.

#### Option A: Delete by Row Number
*   **URL:** `/:spreadsheetId/:sheetName/:rowIndex`
*   **Method:** `DELETE`
*   **Example:** `DELETE /api/sheets/1xB7...ID/Sheet1/5` (Deletes the 5th row)

#### Option B: Delete by Value (Search)
*   **URL:** `/:spreadsheetId/:sheetName/:value?column=ColumnLetter`
*   **Method:** `DELETE`
*   **Query Param:** `column` - The column letter (or label) to search in.
*   **Example:** `DELETE /api/sheets/1xB7...ID/Sheet1/john@example.com?column=B`
    *   This searches Column B for "john@example.com" and deletes that row.

## Project Structure

*   `index.js`: Entry point. Sets up Express server.
*   `src/routes.js`: Defines API routes.
*   `src/controllers.js`: Logic for Sheets API interaction.
*   `src/auth.js`: Handles Google Auth with `service_account.json`.
*   `src/utils.js`: Helper functions (e.g., getting `sheetId`).
