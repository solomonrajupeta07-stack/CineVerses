/* Global storage for the fetched movie list */
let allMovies = []; 

/* 1. INITIALIZE APP: Fetches data and handles URL parameters on load */
window.onload = async function () {
    const urlParams = new URLSearchParams(window.location.search);
    
    try {
        /* Fetch initial movie data from the Render backend */
        const res = await fetch("https://cineverse-backend-zvq1.onrender.com/movies");
        allMovies = await res.json();

        /* Determine view based on URL parameters for sharing/history */
        if (urlParams.has("lang")) {
            const lang = urlParams.get("lang");
            const langEl = document.getElementById("languageSelect");
            if (langEl) langEl.value = lang;
            fetchByLanguage(lang);
        } else if (urlParams.has("mood")) {
            const mood = urlParams.get("mood");
            detectMood(mood);
        } else {
            displayMovies(allMovies);
            const statusText = document.querySelector("p");
            if (statusText) statusText.innerText = "All Movies";
        }
    } catch (err) {
        console.error("Initialization Error:", err);
        alert("Backend not running or connection failed");
    }
};

/* 2. DISPLAY LOGIC: Renders movie cards into the grid */
function displayMovies(movieList) {
    const container = document.getElementById("movieContainer");
    if (!container) return;

    container.innerHTML = "";
    
    if (!movieList || movieList.length === 0) {
        container.innerHTML = "<p>No movies found</p>";
        return;
    }

    /* Build HTML string first then inject once for better performance */
    const movieHTML = movieList.map(movie => `
        <div class="movie" onclick="openModal('${movie.name}')">
            <img src="${movie.poster}" alt="${movie.name}">
            <h3>${movie.name}</h3>
        </div>
    `).join('');

    container.innerHTML = movieHTML;
}

/* 3. EVENT LISTENERS: Handling user input and keyboard actions */
document.getElementById("user-input")?.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

/* 4. CHAT SYSTEM: Handles natural language movie discovery */
async function sendMessage() {
  const input = document.getElementById("user-input");
  if (!input) return;
  
  const message = input.value;
  if (!message) return;

  addMessage(message, "user");

  try {
    const res = await fetch("https://cineverse-backend-zvq1.onrender.com/mood", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: message })
    });

    const data = await res.json();

    /* Bot response logic based on genre or mood detection */
    addMessage(
      data.type === "genre"
        ? "Showing " + data.value + " movies"
        : "Detected mood: " + data.value,
      "bot"
    );

    displayMovies(data.movies || []);

  } catch (err) {
    console.error("Chat Error:", err);
    addMessage("Error connecting to server", "bot");
  }

  input.value = "";
}

/* Helper to append messages to the chat box */
function addMessage(text, sender) {
  const chatBox = document.getElementById("chat-box");
  if (!chatBox) return;

  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.innerText = text;

  chatBox.appendChild(msg);
  /* Auto-scroll to the bottom of the chat */
  chatBox.scrollTop = chatBox.scrollHeight;
}

/* 5. MOOD SYSTEM: Fetches recommendations based on user sentiment */
async function detectMood(existingMood = null) {
    const inputEl = document.getElementById("user-input");
    const input = existingMood || (inputEl ? inputEl.value : "");
    
    if (!input) {
        alert("Please describe your mood");
        return;
    }

    try {
        const res = await fetch("https://cineverse-backend-zvq1.onrender.com/mood", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: input })
        });

        if (!res.ok) throw new Error(`Server Error: ${res.status}`);

        const data = await res.json();

        if (!data || !data.value) {
            const statusText = document.querySelector("p");
            if (statusText) statusText.innerText = "Something went wrong";
            return;
        }

        const statusText = document.querySelector("p");
        if (statusText) {
            statusText.innerText = data.type === "genre"
                ? "Showing " + data.value + " movies"
                : "Detected mood: " + data.value;
        }

        displayMovies(data.movies || []);
        
        /* Update browser history without refreshing the page */
        history.pushState({ type: data.type, value: data.value }, "", `?${data.type}=${data.value}`);
        
    } catch (err) {
        console.error("Mood Detection Error:", err);
        alert("Check console for backend error details.");
    }
}

/* 6. LANGUAGE FILTER: Direct API call for specific language subsets */
const languageSelect = document.getElementById("languageSelect");
if (languageSelect) {
    languageSelect.addEventListener("change", async function () {
        const selectedLang = this.value;

        let url = selectedLang 
            ? `https://cineverse-backend-zvq1.onrender.com/language/${selectedLang}`
            : `https://cineverse-backend-zvq1.onrender.com/movies`;

        try {
            const res = await fetch(url);
            const data = await res.json();
            displayMovies(data);
            history.pushState({ type: "language", value: selectedLang }, "", `?lang=${selectedLang}`);
        } catch (err) {
            console.error("Language Fetch Error:", err);
        }
    });
}

/* 7. HISTORY HANDLING: Enables back/forward button functionality */
window.onpopstate = async function (event) {
    if (!event.state) {
        displayMovies(allMovies);
        return;
    }

    const { type, value } = event.state;

    if (type === "language") {
        /* Re-trigger language fetch on history navigation */
        const res = await fetch(`https://cineverse-backend-zvq1.onrender.com/language/${value}`);
        const data = await res.json();
        displayMovies(data);
    } else {
        const res = await fetch("https://cineverse-backend-zvq1.onrender.com/mood", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: value }), 
        });

        const data = await res.json();
        displayMovies(data.movies || []);
    }
};

/* 8. MODAL SYSTEM: Controls display of detailed movie information */
function openModal(movieName) {
  const movie = allMovies.find(m => m.name === movieName);
  
  if (!movie) return;

  const poster = document.getElementById("modalPoster");
  const title = document.getElementById("modalTitle");
  const rating = document.getElementById("modalRating");
  const overview = document.getElementById("modalOverview");
  const modal = document.getElementById("movieModal");

  if (poster) poster.src = movie.poster;
  if (title) title.innerText = movie.name;

  const genreDisplay = Array.isArray(movie.genre) 
    ? movie.genre.join(", ") 
    : movie.genre;

  if (rating) {
    rating.innerHTML = `<strong>Rating:</strong> ${movie.rating} | <strong>Genre:</strong> ${genreDisplay}`;
  }

  if (overview) overview.innerText = movie.overview;
  if (modal) modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("movieModal");
  if (modal) modal.style.display = "none";
}

/* Close modal when user clicks outside of the content area */
window.onclick = function(event) {
  const modal = document.getElementById("movieModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};