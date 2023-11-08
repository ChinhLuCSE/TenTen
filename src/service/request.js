import { token } from "./cookie";

export function sendRequest(url, method = "GET", data = null) {
  const requestOptions = {
    method: method,
    headers: {
      "Content-Type": "application/json", // Set the appropriate content type
    },
    body: data ? JSON.stringify(data) : null,
  };

  return fetch(url, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok (${response.status})`);
      }
      return response.json(); // This assumes the API returns JSON data
    })
    .then((data) => {
      return data; // You can process the data here if needed
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
}

export function sendRequestWithToken(url, method = "GET", data = null) {
  const requestOptions = {
    method: method,
    headers: {
      "Content-Type": "application/json", // Set the appropriate content type
      Authorization: `Bearer ${token}`, // Add the bearer token header
    },
    body: data ? JSON.stringify(data) : null,
  };

  return fetch(url, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok (${response.status})`);
      }
      return response.json(); // This assumes the API returns JSON data
    })
    .then((data) => {
      return data; // You can process the data here if needed
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
}
