const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchHistoryList = document.getElementById('search-history');
const clearHistoryButton = document.getElementById('clear-history-button');


let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];


function displaySearchHistory() {
    searchHistoryList.innerHTML = ''; 
    searchHistory.forEach(term => {
        const li = document.createElement('li');
        li.textContent = term;
        searchHistoryList.appendChild(li);
    });
}


function addSearchTerm(term) {
    if (term && !searchHistory.includes(term)) {
        searchHistory.push(term);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        displaySearchHistory(); 
    }
}


function searchOnGoogle(term) {
    if (term) {
        const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(term)}`;
        window.open(googleSearchUrl, '_blank'); 
    }
}


searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim(); 
    if (searchTerm) {
        addSearchTerm(searchTerm); 
        searchOnGoogle(searchTerm); 
        searchInput.value = ''; 
    } else {
        alert('Please enter a search term!'); 
    }
});


clearHistoryButton.addEventListener('click', () => {
    searchHistory = [];
    localStorage.removeItem('searchHistory');
    displaySearchHistory(); 
});


displaySearchHistory();
