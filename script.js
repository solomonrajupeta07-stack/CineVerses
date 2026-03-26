let allMovies = []; 

// ✅ 1. INITIALIZE APP (Merged window.onload)
window.onload = async function () {
    const urlParams = new URLSearchParams(window.location.search);
    
    try {
        // Fetch all movies initially to store in memory for the Modal
        const res = await fetch("https://cineverse-backend-zvq1.onrender.com/movies");
        allMovies = await res.json();

        if (urlParams.has("lang")) {
            const lang = urlParams.get("lang");
            document.getElementById("languageSelect").value = lang;
            fetchByLanguage(lang);
        } else if (urlParams.has("mood")) {
            const mood = urlParams.get("mood");
            document.getElementById("moodInput").value = mood;
            detectMood(mood); // Trigger mood detection from URL
        } else {
            displayMovies(allMovies);
            document.querySelector("p").innerText = "All Movies 🎬";
        }
    } catch (err) {
        console.error("Initialization Error:", err);
        alert("Backend not running 😢");
    }
};

// ✅ 2. ENTER KEY FEATURE
document.getElementById("moodInput").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        detectMood();
    }
});

// ✅ 3. DETECT MOOD (With Backend Verification)
async function detectMood(existingMood = null) {
    const input = existingMood || document.getElementById("moodInput").value;
    
    if (!input) {
        alert("Enter your mood 😅");
        return;
    }

    const payload = { text: input };
    console.log("Sending to Backend:", payload); // Verify outgoing data

    try {
        const res = await fetch("https://cineverse-backend-zvq1.onrender.com/mood", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (!res.ok) throw new Error(`Server Error: ${res.status}`);

        const data = await res.json();
        console.log("Received from Backend:", data); // Verify incoming data

        if (!data || !data.mood) {
            document.querySelector("p").innerText = "Something went wrong 😢";
            return;
        }

        document.querySelector("p").innerText = "Detected mood: " + data.mood + " 🎬";
        displayMovies(data.movies || []);

        // ✅ FIXED HISTORY: Use data.mood to ensure it matches the detected state
        history.pushState({ type: "mood", value: data.mood }, "", `?mood=${data.mood}`);
        
    } catch (err) {
        console.error("Mood Detection Error:", err);
        alert("Check console for backend error details.");
    }
}

// ✅ 4. LANGUAGE FILTER LOGIC
async function fetchByLanguage(lang) {
    try {
        const res = await fetch(`https://cineverse-backend-zvq1.onrender.com/language/${lang}`);
        const data = await res.json();
        
        if (!data || data.length === 0) {
            document.getElementById("movieContainer").innerHTML = "<h2>No movies found 😢</h2>";
            return;
        }
        displayMovies(data);
    } catch (err) {
        console.error("Language Fetch Error:", err);
    }
}

// ✅ 5. HANDLE BROWSER BACK/FORWARD BUTTONS
window.onpopstate = async function (event) {
    if (!event.state) {
        displayMovies(allMovies);
        return;
    }

    const { type, value } = event.state;
    if (type === "language") {
        fetchByLanguage(value);
    } else if (type === "mood") {
        // Note: For history to work, your backend must handle 'text' or 'mood' key consistently
        const res = await fetch("https://cineverse-backend-zvq1.onrender.com/mood", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: value }), 
        });
        const data = await res.json();
        displayMovies(data.movies || []);
    }
};

// ✅ 6. OPEN MODAL WITH DETAILED INFO (With "Two Genre" fix)
function openModal(movieName) {
  // Find the movie by name in your global allMovies array
  const movie = allMovies.find(m => m.name === movieName);
  
  if (!movie) {
    console.error("Movie not found!");
    return;
  }

  // 1. Update Image & Title
  document.getElementById("modalPoster").src = movie.poster;
  document.getElementById("modalTitle").innerText = movie.name;

  // 2. Handle Multiple Genres (The "Two Genre" fix)
  // This turns ["romance", "drama"] into "romance, drama"
  const genreDisplay = Array.isArray(movie.genre) 
    ? movie.genre.join(", ") 
    : movie.genre;

  // 3. Update Rating & Genre Info
  document.getElementById("modalRating").innerHTML = 
    `<strong>⭐ Rating:</strong> ${movie.rating} | <strong>🎭 Genre:</strong> ${genreDisplay}`;

  // 4. Update Overview
  document.getElementById("modalOverview").innerText = movie.overview;

  // 5. Show the Modal
  document.getElementById("movieModal").style.display = "block";
}

// ✅ Close Modal Function
function closeModal() {
  document.getElementById("movieModal").style.display = "none";
}

// ✅ Close if user clicks the dark background (outside the content box)
window.onclick = function(event) {
  const modal = document.getElementById("movieModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};