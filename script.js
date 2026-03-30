let allMovies = [];

window.onload = async function () {
    try {
        const res = await fetch("https://cineverse-backend-zvq1.onrender.com/movies");
        allMovies = await res.json();
        displayMovies(allMovies);
    } catch (err) {
        alert("Server error");
    }
};

async function searchMovies() {
    const inputEl = document.getElementById("user-input");
    const text = inputEl.value
        .trim()
        .toLowerCase()
        .replace(/[^\w\s]/gi, "");

    if (!text) return;

    try {
        const res = await fetch("https://cineverse-backend-zvq1.onrender.com/mood", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ mood: text })
        });

        const data = await res.json();
        displayMovies(data);
        inputEl.value = "";

    } catch (err) {
        alert("Error");
    }
}

function displayMovies(movieList) {
    const container = document.getElementById("movieContainer");

    if (!movieList.length) {
        container.innerHTML = "<p>No movies found</p>";
        return;
    }

    container.innerHTML = movieList.map(movie => `
        <div class="movie" onclick="openModal('${movie.name}')">
            <img src="${movie.poster}">
            <h3>${movie.name}</h3>
        </div>
    `).join('');
}

function openModal(name) {
    const m = allMovies.find(x => x.name === name);

    document.getElementById("modalPoster").src = m.poster;
    document.getElementById("modalTitle").innerText = m.name;
    document.getElementById("modalOverview").innerText = m.overview;
    document.getElementById("modalRating").innerText = m.rating;

    document.getElementById("movieModal").style.display = "block";
}

function closeModal() {
    document.getElementById("movieModal").style.display = "none";
}

document.getElementById("user-input").addEventListener("keypress", e => {
    if (e.key === "Enter") searchMovies();
});

document.getElementById("languageSelect").addEventListener("change", async function () {
    const lang = this.value;

    const url = lang
        ? `https://cineverse-backend-zvq1.onrender.com/language/${lang}`
        : `https://cineverse-backend-zvq1.onrender.com/movies`;

    const res = await fetch(url);
    const data = await res.json();
    displayMovies(data);
});