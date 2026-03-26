let allMovies = [];

// ✅ LOAD ALL MOVIES ON HOME SCREEN
window.onload = async function () {
  try {
    const res = await fetch("http://localhost:5000/movies");
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
    const res = await fetch("http://localhost:5000/mood", {
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

    document.getElementById("homeBtn").style.display = "inline-block";

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