require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");
const movies = require("./movies");

const app = express();

/* Check for API Key to prevent startup crashes on Render */
if (!process.env.OPENAI_API_KEY) {
  console.error("CRITICAL ERROR: OPENAI_API_KEY is missing from environment variables.");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors());
app.use(express.json());

/* Request Logging */
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});

/* 1. ROOT ROUTE: Required for Render's health check */
app.get("/", (req, res) => {
  res.send("CineVerse Backend is Online");
});

/* 2. GET ALL MOVIES */
app.get("/movies", (req, res) => {
  res.json(movies);
});

/* 3. LANGUAGE FILTER */
app.get("/language/:lang", (req, res) => {
  const lang = req.params.lang.toLowerCase();
  const filteredMovies = movies.filter(
    movie => movie.language && movie.language.toLowerCase() === lang
  );
  res.json(filteredMovies);
});

const moodToGenre = {
  happy: ["comedy", "family"],
  sad: ["drama", "romance"],
  romantic: ["romance"],
  action: ["action", "thriller"],
  horror: ["horror", "thriller"],
  motivational: ["biography", "drama"]
};

const availableGenres = ["action", "comedy", "romance", "drama", "horror", "thriller", "biography", "family"];

/* 4. MOOD DETECTION ROUTE */
app.post("/mood", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "No text provided" });

    const userText = text.toLowerCase();

    /* Step 1: Keyword Check */
    const detectedGenre = availableGenres.find((genre) => userText.includes(genre));

    if (detectedGenre) {
      const filteredMovies = movies.filter((movie) => 
        movie.genre && movie.genre.toLowerCase().includes(detectedGenre)
      );
      return res.json({ type: "genre", value: detectedGenre, movies: filteredMovies });
    }

    /* Step 2: OpenAI Analysis */
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Detect user mood. Reply with ONE word: happy, sad, romantic, action, horror, motivational" },
        { role: "user", content: text },
      ],
    });

    const mood = response.choices[0].message.content.trim().toLowerCase();
    const genres = moodToGenre[mood] || [];

    const filteredMovies = movies.filter((movie) =>
      movie.genre && genres.includes(movie.genre.toLowerCase())
    );

    res.json({ type: "mood", value: mood, movies: filteredMovies });

  } catch (error) {
    console.error("OpenAI or Server Error:", error.message);
    res.status(500).json({ error: "Failed to process mood. Check server logs." });
  }
});

/* 5. START SERVER */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});