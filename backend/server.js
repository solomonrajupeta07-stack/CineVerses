require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const movies = require("./movies");

const app = express();

/* ✅ Initialize Gemini */
if (!process.env.GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY is missing");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/* ✅ Middleware */
app.use(cors());
app.use(express.json());

/* ✅ Logging */
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

/* ✅ Root Route */
app.get("/", (req, res) => {
  res.send("CineVerse Backend (Gemini) is Online 🚀");
});

/* ✅ Get All Movies */
app.get("/movies", (req, res) => {
  res.json(movies);
});

/* ✅ Language Filter */
app.get("/language/:lang", (req, res) => {
  const lang = req.params.lang.toLowerCase();

  const filtered = movies.filter(
    (m) => m.language && m.language.toLowerCase() === lang
  );

  res.json(filtered);
});

/* ✅ Mood → Genre Mapping */
const moodToGenre = {
  happy: ["comedy", "family"],
  sad: ["drama", "romance"],
  romantic: ["romance"],
  action: ["action", "thriller"],
  horror: ["horror", "thriller"],
  motivational: ["biography", "drama"],
};

/* ✅ Available Genres */
const availableGenres = [
  "action",
  "comedy",
  "romance",
  "drama",
  "horror",
  "thriller",
  "biography",
  "family",
];

/* ✅ Safe Movie Filter */
function filterMoviesByGenres(genres) {
  return movies.filter((movie) => {
    if (!movie.genre) return false;

    if (Array.isArray(movie.genre)) {
      return movie.genre.some((g) =>
        genres.includes(g.toLowerCase())
      );
    }

    return genres.includes(movie.genre.toLowerCase());
  });
}

/* ✅ Mood + Genre Route */
app.post("/mood", async (req, res) => {
  try {
    const { text } = req.body;

    console.log("Incoming text:", text);

    if (!text) {
      return res.status(400).json({ error: "No text provided" });
    }

    const userText = text.toLowerCase();

    /* 🔥 STEP 1: Direct Genre */
    const detectedGenre = availableGenres.find((g) =>
      userText.includes(g)
    );

    if (detectedGenre) {
      const filteredMovies = filterMoviesByGenres([detectedGenre]);

      return res.json({
        type: "genre",
        value: detectedGenre,
        movies: filteredMovies,
      });
    }

    /* 🔥 STEP 2: Gemini AI Mood Detection */
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(
      `Detect user mood from this text. 
       Reply ONLY one word: happy, sad, romantic, action, horror, motivational.
       Text: ${text}`
    );

    let mood = result.response.text().trim().toLowerCase();

    // 🔥 Clean output (important)
    mood = mood.replace(".", "").replace("\n", "");

    console.log("Detected mood:", mood);

    const genres = moodToGenre[mood] || [];

    const filteredMovies = filterMoviesByGenres(genres);

    res.json({
      type: "mood",
      value: mood,
      movies: filteredMovies,
    });

  } catch (error) {
    console.error("❌ ERROR:", error.message);

    res.status(500).json({
      error: "Server failed",
      details: error.message,
    });
  }
});

/* ✅ Start Server */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});