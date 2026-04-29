class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export default ApiResponse;

// You’re defining a reusable API response wrapper for your backend. This class standardizes how responses are structured, making it easier for clients to parse and understand the results of their requests.
// This makes it easy to return consistent responses across your whole AP
