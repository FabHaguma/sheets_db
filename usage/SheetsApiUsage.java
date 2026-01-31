import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpRequest.BodyPublishers;

public class SheetsApiUsage {

    private static final String BASE_URL = "https://sheetsdb.haguma.com/api/sheets";
    private static final String SPREADSHEET_ID = "1ZFJWCFmbQpeuSRaL67jzGek112wquKdIJL0xf4H3MyU";
    private static final String SHEET_NAME = "Sheet1";
    
    private static final HttpClient client = HttpClient.newHttpClient();

    public static void main(String[] args) throws Exception {
        // readData();
        // appendData("[\"Java User\", \"java@test.com\", \"Active\"]");
    }

    // 1. Read Data (GET)
    public static void readData() throws Exception {
        String url = String.format("%s/%s/%s!A1:J100", BASE_URL, SPREADSHEET_ID, SHEET_NAME);
        
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .GET()
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println("GET Read Data: " + response.body());
    }

    // 2. Append Data (POST)
    // jsonValues should be like "[\"Val1\", \"Val2\"]"
    public static void appendData(String jsonRowArray) throws Exception {
        String url = String.format("%s/%s/%s!A1", BASE_URL, SPREADSHEET_ID, SHEET_NAME);
        String jsonBody = String.format("{\"values\": [%s]}", jsonRowArray);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header("Content-Type", "application/json")
                .POST(BodyPublishers.ofString(jsonBody))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println("POST Append: " + response.body());
    }

    // 3. Update by Value (PUT)
    public static void updateByValue(String email, String jsonRowArray) throws Exception {
        String url = String.format("%s/%s/%s/%s?column=B", BASE_URL, SPREADSHEET_ID, SHEET_NAME, email);
        String jsonBody = String.format("{\"values\": [%s]}", jsonRowArray);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header("Content-Type", "application/json")
                .PUT(BodyPublishers.ofString(jsonBody))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println("PUT Update: " + response.body());
    }
}
