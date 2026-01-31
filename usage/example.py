import requests
import json

BASE_URL = "https://sheetsdb.haguma.com/api/sheets"
SPREADSHEET_ID = "1ZFJWCFmbQpeuSRaL67jzGek112wquKdIJL0xf4H3MyU" # Replace with yours
SHEET_NAME = "Sheet1"

def read_data(range_str="A1:J100"):
    """
    1. Read Data (GET)
    Retrieves values from a specific range.
    """
    url = f"{BASE_URL}/{SPREADSHEET_ID}/{SHEET_NAME}!{range_str}"
    response = requests.get(url)
    print("GET:", response.status_code, response.json())

def read_data_paginated(page=1, limit=10):
    """
    1b. Read Data with Pagination (GET)
    """
    range_str = "A1:J100"
    url = f"{BASE_URL}/{SPREADSHEET_ID}/{SHEET_NAME}!{range_str}"
    params = {"page": page, "limit": limit}
    response = requests.get(url, params=params)
    print("GET Paginated:", response.status_code, response.json())

def append_data(row_data):
    """
    2. Append Data (POST)
    row_data should be a list, e.g. ["Name", "Email", "Status"]
    """
    url = f"{BASE_URL}/{SPREADSHEET_ID}/{SHEET_NAME}!A1"
    payload = {"values": [row_data]}
    headers = {'Content-Type': 'application/json'}
    
    response = requests.post(url, json=payload, headers=headers)
    print("POST Append:", response.status_code, response.json())

def update_by_value(search_value, search_column, new_row_data):
    """
    3b. Update by Value (PUT)
    Searches column `search_column` for `search_value`, then updates that row.
    """
    url = f"{BASE_URL}/{SPREADSHEET_ID}/{SHEET_NAME}/{search_value}"
    params = {"column": search_column}
    payload = {"values": [new_row_data]}
    
    response = requests.put(url, params=params, json=payload)
    print("PUT Update by Value:", response.status_code, response.json())

def delete_by_value(search_value, search_column):
    """
    4. Delete by Value (DELETE)
    """
    url = f"{BASE_URL}/{SPREADSHEET_ID}/{SHEET_NAME}/{search_value}"
    params = {"column": search_column}
    
    response = requests.delete(url, params=params)
    print("DELETE by Value:", response.status_code, response.json())

def delete_by_row_index(row_index):
    """
    5. Delete by Row Index (DELETE)
    row_index is 1-based integer
    """
    url = f"{BASE_URL}/{SPREADSHEET_ID}/{SHEET_NAME}/{row_index}"
    response = requests.delete(url)
    print("DELETE by Index:", response.status_code, response.json())

if __name__ == "__main__":
    # Uncomment to test
    # read_data()
    # append_data(["Python User", "py@test.com", "Active"])
    # update_by_value("py@test.com", "B", ["Python Updated", "py@test.com", "Closed"])
    # delete_by_value("py@test.com", "B")
    pass
