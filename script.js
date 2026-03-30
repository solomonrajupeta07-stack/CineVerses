/* Global storage for movies */
let allMovies = []; 

/* 1. INITIALIZE: Load all movies on start */
window.onload = async function () {
    try {
        const res = await fetch("https://cineverse-backend-zvq1.onrender.com/movies");
        allMovies = await res.json();
        displayMovies(allMovies);
        addMessage("Welcome! Tell me how you feel, and I will find movies for you.", "bot");
    } catch (err) {
        console.error("Init Error:", err);
        addMessage("Connection to server failed.", "bot");
    }
};

/* 2. CHAT LOGIC: Send message and get AI response */
async function sendMessage() {
    const inputEl = document.getElementById("user-input");
    const text = inputEl.value.trim();
    
    if (!text) return;

    // Show user message in chat
    addMessage(text, "user");
    inputEl.value = ""; // Clear input

    try {
        const res = await fetch("https://cineverse-backend-zvq1.onrender.com/mood", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: text })
        });

        if (!res.ok) throw new Error("Server Error");

        const data = await res.json();

        // Show bot response based on data type
        const botResponse = data.type === "genre" 
            ? "I found some " + data.value + " movies for you."
            : "You seem " + data.value + ". Try these movies.";
        
        addMessage(botResponse, "bot");

        // Update the movie grid
        displayMovies(data.movies || []);

    } catch (err) {
        console.error("Chat Error:", err);
        addMessage("Sorry, I am having trouble connecting right now.", "bot");
    }
}

/* 3. HELPERS: Adding messages to UI */
function addMessage(text, sender) {
    const chatBox = document.getElementById("chat-box");
    if (!chatBox) return;

    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message", sender);
    msgDiv.innerText = text;

    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
}

/* 4. DISPLAY: Rendering movie cards */
function displayMovies(movieList) {
    const container = document.getElementById("movieContainer");
    if (!container) return;

    if (!movieList || movieList.length === 0) {
        container.innerHTML = "<p>No movies found.</p>";
        return;
    }

    container.innerHTML = movieList.map(movie => `
        <div class="movie" onclick="openModal('${movie.name}')">
            <img src="${movie.poster}" alt="${movie.name}">
            <h3>${movie.name}</h3>
        </div>
    `).join('');
}

/* 5. MODAL: Open and close */
function openModal(movieName) {
    const movie = allMovies.find(m => m.name === movieName);
    if (!movie) return;

    document.getElementById("modalPoster").src = movie.poster;
    document.getElementById("modalTitle").innerText = movie.name;
    document.getElementById("modalOverview").innerText = movie.overview;
    document.getElementById("modalRating").innerHTML = `<strong>Rating:</strong> ${movie.rating}`;
    document.getElementById("movieModal").style.display = "block";
}

function closeModal() {
    document.getElementById("movieModal").style.display = "none";
}

/* 6. EVENT BINDING: Language and Enter Key */
document.getElementById("user-input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});

const langSelect = document.getElementById("languageSelect");
if (langSelect) {
    langSelect.addEventListener("change", async function() {
        const lang = this.value;
        const url = lang 
            ? `https://cineverse-backend-zvq1.onrender.com/language/${lang}`
            : `https://cineverse-backend-zvq1.onrender.com/movies`;
            
        try {
            const res = await fetch(url);
            const data = await res.json();
            displayMovies(data);
        } catch (err) {
            console.error("Lang Error:", err);
        }
    });
}