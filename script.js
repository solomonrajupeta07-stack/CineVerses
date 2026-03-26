let allMovies = [];

// ✅ LOAD ALL MOVIES ON HOME SCREEN
window.onload = async function () {
  try {
    const res = await fetch("https://cineverse-backend-zvq1.onrender.com/movies");
    allMovies = await res.json();

    displayMovies(allMovies); // 🔥 show all movies

    document.querySelector("p").innerText =
      "All Movies 🎬";

  } catch (err) {
    console.error(err);
    alert("Backend not running 😢");
  }
};

// ✅ DETECT MOOD (BACKEND)
async function detectMood() {
  const input = document.getElementById("moodInput").value;

  if (!input) {
    alert("Enter your mood 😅");
    return;
  }

  try {
    const res = await fetch("https://cineverse-backend-zvq1.onrender.com/mood", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: input })
    });

    const data = await res.json();

    if (!data || !data.mood) {
      document.querySelector("p").innerText =
        "Something went wrong 😢";
      return;
    }

    document.querySelector("p").innerText =
      "Detected mood: " + data.mood + " 🎬";

    displayMovies(data.movies || []);

    // ✅ Add history
    history.pushState({ type: "mood", value: mood }, "", `?mood=${mood}`);

    // document.getElementById("homeBtn").style.display = "inline-block";

  } catch (err) {
    console.error(err);
    alert("Backend not running 😢");
  }
}

// ✅ DISPLAY MOVIES
function displayMovies(movieList) {
  const container = document.getElementById("movieContainer");
  container.innerHTML = "";

  if (movieList.length === 0) {
    container.innerHTML = "<p>No movies found 😢</p>";
    return;
  }

  movieList.forEach(movie => {
    container.innerHTML += `
      <div class="movie" onclick="openModal('${movie.name}')">
        <img src="${movie.poster}">
        <h3>${movie.name}</h3>
      </div>
    `;
  });
}

// ✅ OPEN MODAL
function openModal(movieName) {
  const movie = allMovies.find(m => m.name === movieName);

  if (!movie) return;

  document.getElementById("modalPoster").src = movie.poster;
  document.getElementById("modalTitle").innerText = movie.name;
  document.getElementById("modalRating").innerText =
    "⭐ Rating: " + movie.rating;
  document.getElementById("modalOverview").innerText =
    movie.overview;

  document.getElementById("movieModal").style.display = "block";
}

// ✅ CLOSE MODAL
function closeModal() {
  document.getElementById("movieModal").style.display = "none";
}

// ✅ HOME BUTTON (SHOW ALL MOVIES AGAIN)
function showAllMovies() {
  displayMovies(allMovies);

  document.querySelector("p").innerText =
    "All Movies 🎬";

  document.getElementById("homeBtn").style.display = "none";
}
// ✅ LANGUAGE FILTER
const languageSelect = document.getElementById("languageSelect");

languageSelect.addEventListener("change", async function () {
  const selectedLang = this.value;

  let url = "https://cineverse-backend-zvq1.onrender.com/movies";

  if (selectedLang !== "") {
    url = `https://cineverse-backend-zvq1.onrender.com/language/${selectedLang}`;
  }

  try {
    const res = await fetch(url);
    const data = await res.json();

    // ✅ IMPORTANT FIX
    if (data.length === 0) {
      document.getElementById("moviesContainer").innerHTML =
        "<h2>No movies found 😢</h2>";
      return;
    }

    displayMovies(data);

    // ✅ Add history
    history.pushState({ type: "language", value: selectedLang }, "", `?lang=${selectedLang}`);

  } catch (err) {
    console.error(err);
  }
});

window.onpopstate = async function (event) {
  if (!event.state) {
    // Default home
    const res = await fetch("https://cineverse-backend-zvq1.onrender.com/movies");
    const data = await res.json();
    displayMovies(data);
    return;
  }

  if (event.state.type === "language") {
    const res = await fetch(
      `https://cineverse-backend-zvq1.onrender.com/language/${event.state.value}`
    );
    const data = await res.json();
    displayMovies(data);
  }

  if (event.state.type === "mood") {
    const res = await fetch("https://cineverse-backend-zvq1.onrender.com/mood", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mood: event.state.value }),
    });
    const data = await res.json();
    displayMovies(data);
  }
};

//load state from URL on page load
window.onload = async function () {
  const urlParams = new URLSearchParams(window.location.search);

  if (urlParams.has("lang")) {
    const lang = urlParams.get("lang");
    languageSelect.value = lang;
    const res = await fetch(`https://cineverse-backend-zvq1.onrender.com/language/${lang}`);
    const data = await res.json();
    displayMovies(data);
  } else if (urlParams.has("mood")) {
    const mood = urlParams.get("mood");
    document.getElementById("moodInput").value = mood;
    const res = await fetch("https://cineverse-backend-zvq1.onrender.com/mood", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mood }),
    });
    const data = await res.json();
    displayMovies(data);
  } else {
    // Default home
    const res = await fetch("https://cineverse-backend-zvq1.onrender.com/movies");
    const data = await res.json();
    displayMovies(data);
  }
};