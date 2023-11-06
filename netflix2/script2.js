// API key from TMDB
const api = "api_key=1e55487b6d3e0c19ff797a2523bc0488";
// Base URL of the site
const base_url = "https://api.themoviedb.org/3";

const banner_url = "https://image.tmdb.org/t/p/original";
const image_url = "https://image.tmdb.org/t/p/w300";

// Request object
const requests = {
    fetchTrending: `${base_url}/trending/all/week?${api}&language=en-US`,
    fetchNetflixOriginals: `${base_url}/discover/tv?${api}&with_network=213`,
    fetchActionMovies: `${base_url}/discover/tv?${api}&with_network=28`,
    fetchComedyMovies: `${base_url}/discover/tv?${api}&with_genres=35`,
    fetchHorrorMovies: `${base_url}/discover/tv?${api}&with_genres=27`,
    fetchRomanceMovies: `${base_url}/discover/tv?${api}&with_genres=10749`,
    fetchDocumentaries: `${base_url}/discover/tv?${api}&with_genres=99`,
};

// Function to truncate a string
function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

// Function to fetch and display content on the banner
function setBannerContent() {
    fetch(requests.fetchNetflixOriginals)
        .then((res) => res.json())
        .then((data) => {
            const randomIndex = Math.floor(Math.random() * data.results.length);
            const setMovie = data.results[randomIndex];

            const banner = document.getElementById("banner");
            const banner_title = document.getElementById("banner_title");
            const banner_desc = document.getElementById("banner_description");

            banner.style.backgroundImage =
                "url(" + banner_url + setMovie.backdrop_path + ")";
            banner_desc.innerText = truncate(setMovie.overview, 150);
            banner_title.innerText = setMovie.name;
        });
}

// Function to fetch and display movie rows
function displayMovieRow(fetchUrl, rowTitle, containerId) {
    fetch(fetchUrl)
        .then((res) => res.json())
        .then((data) => {
            const headrow = document.getElementById("headrow");
            const row = document.createElement("div");
            row.className = "row";

            headrow.appendChild(row);

            const title = document.createElement("h2");
            title.className = "row_title";
            title.innerText = rowTitle;
            row.appendChild(title);

            const row_posters = document.createElement("div");
            row_posters.className = "row_posters";
            row.appendChild(row_posters);

            data.results.forEach((movie) => {
                const poster = document.createElement("img");
                poster.className = "row_posterLarge";
                var s = movie.name.replace(/\s+/g, "");
                poster.id = s;
                poster.src = image_url + movie.poster_path;
                row_posters.appendChild(poster);
            });

            // Append the row to the specified container
            document.getElementById(containerId).appendChild(row);
        });
}


// Call functions to set banner content and display movie rows
setBannerContent();
displayMovieRow(requests.fetchNetflixOriginals, "NETFLIX ORIGINALS", "netflix-row");
displayMovieRow(requests.fetchTrending, "Top Rated", "top-rated-row");
displayMovieRow(requests.fetchActionMovies, "Action Movies", "action-row");
displayMovieRow(requests.fetchComedyMovies, "Comedy Movies", "comedy-row");
displayMovieRow(requests.fetchHorrorMovies, "Horror Movies", "horror-row");
displayMovieRow(requests.fetchRomanceMovies, "Romance Movies", "romance-row");
displayMovieRow(requests.fetchDocumentaries, "Documentary Movies", "documentary-row");