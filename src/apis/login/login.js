function sendRequest(url) {
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok (${response.status})`);
        }
        return response.json(); // This assumes the API returns JSON data
      })
      .then(data => {
        return data; // You can process the data here if needed
      })
      .catch(error => {
        console.error('Error:', error);
        throw error;
      });
  }
