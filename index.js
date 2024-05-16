// Get the search input, search results container, and spinner element by their IDs
let searchInput = document.getElementById("searchInput");
let searchResults = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");

// Function to create and append search result items to the search results container
function createAndAppend(result) {
    // Destructure the result object to extract title, link, and description
    let { title, link, description } = result;
    
    // Create a div element for the search result item
    let divEl = document.createElement("div");
    divEl.classList.add("result-item"); // Add class for styling
    searchResults.appendChild(divEl); // Append to search results container

    // Create an anchor element for the title with appropriate attributes
    let Anchor_title = document.createElement("a");
    Anchor_title.classList.add("result-title"); // Add class for styling
    Anchor_title.textContent = title; // Set title text
    Anchor_title.href = link; // Set href attribute to link
    Anchor_title.target = "_blank"; // Open link in a new tab
    divEl.appendChild(Anchor_title); // Append to search result item div

    // Add line break
    let line_break = document.createElement("br");
    divEl.appendChild(line_break);

    // Create an anchor element for the URL with appropriate attributes
    let Anchor_url = document.createElement("a");
    Anchor_url.classList.add("result-url"); // Add class for styling
    Anchor_url.textContent = link; // Set URL text
    Anchor_url.href = link; // Set href attribute to link
    Anchor_url.target = "_blank"; // Open link in a new tab
    divEl.appendChild(Anchor_url); // Append to search result item div

    // Add another line break
    let line_break2 = document.createElement("br");
    divEl.appendChild(line_break2);

    // Create a paragraph element for the description with appropriate styling
    let dec = document.createElement("p");
    dec.classList.add("line-description"); // Add class for styling
    dec.textContent = description; // Set description text
    divEl.appendChild(dec); // Append to search result item div
}

// Function to display search results
function displayResults(search_Result) {
    spinner.classList.toggle("d-none"); // Hide spinner
    // Loop through each search result and call createAndAppend function
    for (let result of search_Result) {
        createAndAppend(result);
    }
}

// Function to handle search when Enter key is pressed in the search input
function searchWiki(event) {
    // Check if Enter key is pressed and search input is not empty
    if (event.key === "Enter" && searchInput.value !== '') {
        searchResults.textContent = ""; // Clear previous search results
        spinner.classList.toggle("d-none"); // Show spinner
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput.value; // API URL with search query
        let options = {
            method: "GET"
        };
        // Fetch search results from API
        fetch(url, options)
            .then(function (response) {
                return response.json(); // Parse response as JSON
            })
            .then(function (jsonData) {
                let { search_results } = jsonData; // Extract search results from JSON data
                console.log(search_results); // Log search results to console (optional)
                displayResults(search_results); // Display search results
            });
    }
}

// Event listener to trigger searchWiki function when Enter key is pressed in the search input
searchInput.addEventListener('keydown', searchWiki);
