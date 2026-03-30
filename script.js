/* Global storage for the fetched movie list */
let allMovies = []; 

/* 1. INITIALIZE APP: Fetches all movies on load to populate the grid */
window.onload = async function () {
    const urlParams = new URLSearchParams(window.location.search);
    
    try {
        /* Initial fetch to get the full database for modal and default view */
        const res = await fetch("https://cineverse-backend-zvq1.onrender.com/movies");
        allMovies = await res.json();

        /* Handle URL parameters for direct linking/sharing */
        if (urlParams.has("lang")) {
            const lang = urlParams.get("lang");
            const langEl = document.getElementById("languageSelect");
            if (langEl) langEl.value = lang;
            updateByLanguage(lang);
        } else if (urlParams.has("mood")) {
            const mood = urlParams.get("mood");
            detectMood(mood);
        } else {
            displayMovies(allMovies);
            updateStatusText("All Movies");
        }
    } catch (err) {
        console.error("Initialization Error:", err);
        alert("Backend not running or connection failed");
    }
};

/* 2. DISPLAY LOGIC: Renders movie cards into the grid container */
function displayMovies(movieList) {
    const container = document.getElementById("movieContainer");
    if (!container) return;

    container.innerHTML = "";
    
    if (!movieList || movieList.length === 0) {
        container.innerHTML = "<p>No movies found matching your request.</p>";
        return;
    }

    /* Build HTML string first for performance optimization */
    const movieHTML = movieList.map(movie => `
        <div class="movie" onclick="openModal('${movie.name}')">
            <img src="${movie.poster}" alt="${movie.name}">
            <h3>${movie.name}</h3>
        </div>
    `).join('');

    container.innerHTML = movieHTML;
}

/* 3. MOOD SYSTEM: Sends user text to AI backend for sentiment-based filtering */
async function detectMood(existingMood = null) {
    const inputEl = document.getElementById("user-input");
    const inputVal = existingMood || (inputEl ? inputEl.value : "");
    
    if (!inputVal) {
        alert("Please describe how you are feeling");
        return;
    }

    updateStatusText("Analyzing your mood...");

    try {
        const res = await fetch("https://cineverse-backend-zvq1.onrender.com/mood", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: inputVal }) // Backend expects { text }
        });

        if (!res.ok) throw new Error("Server Error");

        const data = await res.json();

        /* Update UI with the result from AI */
        const displayLabel = data.type === "genre" 
            ? "Showing " + data.value + " movies" 
            : "Detected mood: " + data.value;
            
        updateStatusText(displayLabel);
        displayMovies(data.movies || []);
        
        /* Update history so the back button works */
        history.pushState({ type: data.type, value: data.value }, "", `?${data.type}=${data.value}`);
        
    } catch (err) {
        console.error("Mood Detection Error:", err);
        updateStatusText("Error finding movies");
    }

    if (inputEl) inputEl.value = ""; // Clear input after search
}

/* 4. LANGUAGE FILTER: Direct filtering via specific API endpoint */
const languageSelect = document.getElementById("languageSelect");
if (languageSelect) {
    languageSelect.addEventListener("change", function () {
        updateByLanguage(this.value);
    });
}

async function updateByLanguage(lang) {
    let url = lang 
        ? `https://cineverse-backend-zvq1.onrender.com/language/${lang}`
        : `https://cineverse-backend-zvq1.onrender.com/movies`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        displayMovies(data);
        updateStatusText(lang ? "Movies in " + lang : "All Movies");
        history.pushState({ type: "language", value: lang }, "", lang ? `?lang=${lang}` : "/");
    } catch (err) {
        console.error("Language Fetch Error:", err);
    }
}

/* 5. MODAL SYSTEM: Controls the detailed movie view popup */
function openModal(movieName) {
    const movie = allMovies.find(m => m.name === movieName);
    if (!movie) return;

    document.getElementById("modalPoster").src = movie.poster;
    document.getElementById("modalTitle").innerText = movie.name;

    const genreDisplay = Array.isArray(movie.genre) ? movie.genre.join(", ") : movie.genre;
    document.getElementById("modalRating").innerHTML = `<strong>Rating:</strong> ${movie.rating} | <strong>Genre:</strong> ${genreDisplay}`;
    document.getElementById("modalOverview").innerText = movie.overview;
    document.getElementById("movieModal").style.display = "block";
}

function closeModal() {
    document.getElementById("movieModal").style.display = "none";
}

/* 6. HELPERS & EVENT BINDING */
function updateStatusText(text) {
    const statusText = document.querySelector("p#statusDisplay");
    if (statusText) statusText.innerText = text;
}

/* Bind Enter key to the mood search input */
document.getElementById("user-input")?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") detectMood();
});

/* Click outside modal to close */
window.onclick = function(event) {
    const modal = document.getElementById("movieModal");
    if (event.target == modal) closeModal();
};

/* Handle browser Back/Forward buttons */
window.onpopstate = function (event) {
    if (!event.state) {
        displayMovies(allMovies);
        updateStatusText("All Movies");
        return;
    }
    // Refresh page with state logic if needed or simply use local data
    location.reload(); 
};