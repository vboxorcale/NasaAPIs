const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const searchResults = document.querySelector('#search-results');
const noResultsModal = document.querySelector('#no-results-modal');

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Get the user's search query
  const query = searchInput.value;
  // Check if the search results are already stored in local storage
  const storedResults = localStorage.getItem(query);
  if (storedResults) {
    // If the search results are stored in local storage, display them to the user
    searchResults.innerHTML = storedResults;
  } else {

  // Make a request to the NASA API to search for images related to the query
  fetch(`https://images-api.nasa.gov/search?q=${query}&media_type=image`)
    .then(response => response.json())
    .then(data => {
        

      // Extract the relevant information from the API response
      const items = data.collection.items;
      if (items.length === 0) {
        // Display a modal if no search results are found
        $('#no-results-modal').modal('show');
      } else if (!query) {
        $('#no-results-modal').modal('show');
        return;
      }else {
        // Convert the API response to HTML elements representing search results
        const searchResultsAPI = items.map(item => {
          const title = item.data[0].title;
          const imageUrl = item.links[0].href;
          const description = item.data[0].description;
          const date = item.data[0].date_created;
          const location = item.data[0].location;
          const photographer = item.data[0].photographer;
          return `
            <div class="search-result">
              <img src="${imageUrl}" alt="${title}">
              <h5 class="card-text">${title}</h5>
              <p class="card-text">${description}</p>
              <p class="card-text">${date}</p>
              <h6 class="card-text">${location}</h6>
              <h6 class="card-text">By ${photographer}</h6>
            </div>       
          `;
        }).join('');

        console.log(data);
        

         // Store the search query and results in local storage
         localStorage.setItem(query, searchResultsAPI);

        // Display the search results to the user
        searchResults.innerHTML = searchResultsAPI;
      }
    })
    .catch(error => {
      console.error(error);
      searchResults.innerHTML = `<p>An error occurred while searching. Please try again later.</p>`;
    });

  }
});