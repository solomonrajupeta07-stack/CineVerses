require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const movies = require("./movies");

const app = express();

/* ✅ Gemini Setup */
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("❌ CRITICAL: GEMINI_API_KEY is missing from Environment Variables");
}
const genAI = new GoogleGenerativeAI(apiKey || "dummy_key");

app.use(cors());
app.use(express.json());

/* ✅ Health Check (Crucial for Render Deployment) */
app.get("/", (req, res) => {
  res.send("CineVerse Backend (Gemini) is Online");
});

app.get("/movies", (req, res) => {
  res.json(movies);
});

app.get("/language/:lang", (req, res) => {
  const lang = req.params.lang.toLowerCase();
  const filtered = movies.filter(m => m.language && m.language.toLowerCase() === lang);
  res.json(filtered);
});

const moodToGenre = {
  happy: ["comedy", "family"],
  sad: ["drama", "romance"],
  romantic: ["romance"],
  action: ["action", "thriller"],
  horror: ["horror", "thriller"],
  motivational: ["biography", "drama"],
};

const availableGenres = ["action", "comedy", "romance", "drama", "horror", "thriller", "biography", "family"];

/* ✅ Helper: Standardized Movie Filter */
function filterMoviesByGenres(genres) {
  if (!genres || genres.length === 0) return [];
  return movies.filter((movie) => {
    if (!movie.genre) return false;
    const movieGenre = movie.genre.toLowerCase();
    return genres.some(g => movieGenre.includes(g));
  });
}

/* ✅ MAIN ROUTE */
app.post("/mood", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "No text provided" });

    const userText = text.toLowerCase();

    /* STEP 1: Direct Genre Detection (Saves API calls) */
    const detectedGenre = availableGenres.find(g => userText.includes(g));

    if (detectedGenre) {
      return res.json({
        type: "genre",
        value: detectedGenre,
        movies: filterMoviesByGenres([detectedGenre]),
      });
    }

    /* STEP 2: Gemini AI Mood Detection */
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `You are a movie mood analyzer. Analyze the user's text and respond with ONLY one of these words: happy, sad, romantic, action, horror, motivational. Do not use punctuation. Text: "${text}"`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let mood = response.text().trim().toLowerCase().replace(/[^a-z]/g, ""); // Removes punctuation/newlines

    console.log("Detected Mood:", mood);

    const genres = moodToGenre[mood] || [];
    const filteredMovies = filterMoviesByGenres(genres);

    res.json({
      type: "mood",
      value: mood,
      movies: filteredMovies,
    });

  } catch (error) {
    console.error("❌ AI/Server Error:", error.message);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

/* ✅ Render-Ready Start */
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server live on port ${PORT}`);
});