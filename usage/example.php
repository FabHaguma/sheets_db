<?php

$baseUrl = "https://sheetsdb.haguma.com/api/sheets";
$spreadsheetId = "1ZFJWCFmbQpeuSRaL67jzGek112wquKdIJL0xf4H3MyU";
$sheetName = "Sheet1";

/**
 * Helpher function to make Requests
 */
function makeRequest($method, $url, $data = null) {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    if ($method !== 'GET') {
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
        if ($data) {
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
            curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
        }
    }

    $response = curl_exec($ch);
    if(curl_errno($ch)){
        echo 'Curl error: ' . curl_error($ch);
    }
    curl_close($ch);
    return json_decode($response, true);
}

// 1. Read Data
function readData($range = "A1:J100") {
    global $baseUrl, $spreadsheetId, $sheetName;
    $url = "$baseUrl/$spreadsheetId/$sheetName!$range";
    $result = makeRequest('GET', $url);
    print_r($result);
}

// 2. Append Data
function appendData($rowArray) {
    global $baseUrl, $spreadsheetId, $sheetName;
    $url = "$baseUrl/$spreadsheetId/$sheetName!A1";
    $result = makeRequest('POST', $url, ["values" => [$rowArray]]);
    print_r($result);
}

// 3. Update by Value (Search Column B)
function updateByValue($searchValue, $newRowArray) {
    global $baseUrl, $spreadsheetId, $sheetName;
    // Search in Column B
    $query = http_build_query(['column' => 'B']);
    $url = "$baseUrl/$spreadsheetId/$sheetName/$searchValue?$query";
    $result = makeRequest('PUT', $url, ["values" => [$newRowArray]]);
    print_r($result);
}

// 4. Delete by Value
function deleteByValue($searchValue) {
    global $baseUrl, $spreadsheetId, $sheetName;
    $query = http_build_query(['column' => 'B']);
    $url = "$baseUrl/$spreadsheetId/$sheetName/$searchValue?$query";
    $result = makeRequest('DELETE', $url);
    print_r($result);
}

// Usage
// readData();
// appendData(["PHP User", "php@test.com", "Active"]);
// updateByValue("php@test.com", ["PHP Updated", "php@test.com", "Inactive"]);
?>
