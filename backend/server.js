require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai"); // Added missing OpenAI import
const movies = require("./movies");

const app = express();

/* Initialize OpenAI with API Key from environment variables */
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/* Middleware Configuration */
app.use(cors());
app.use(express.json());

/* 1. DEBUGGING MIDDLEWARE: Logs incoming requests for development monitoring */
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  if (req.method === "POST") console.log("Body:", req.body);
  next();
});

/* 2. HEALTH CHECK ROUTE: Confirms server status */
app.get("/", (req, res) => {
  res.send("Backend working");
});

/* 3. DATA RETRIEVAL: Returns the full movie database */
app.get("/movies", (req, res) => {
  res.json(movies);
});

/* 4. LANGUAGE FILTERING: Returns movies based on specific language parameter */
app.get("/language/:lang", (req, res) => {
  const lang = req.params.lang.toLowerCase();
  const filteredMovies = movies.filter(
    movie => movie.language && movie.language.toLowerCase() === lang
  );
  res.json(filteredMovies);
});

/* Mapping of detected moods to movie genres */
const moodToGenre = {
  happy: ["comedy", "family"],
  sad: ["drama", "romance"],
  romantic: ["romance"],
  action: ["action", "thriller"],
  horror: ["horror", "thriller"],
  motivational: ["biography", "drama"]
};

/* List of genres supported for direct keyword detection */
const availableGenres = [
  "action",
  "comedy",
  "romance",
  "drama",
  "horror",
  "thriller",
  "biography",
  "family"
];

/* 5. AI MOOD & GENRE DETECTION: Processes user text to find relevant movies */
app.post("/mood", async (req, res) => {
  try {
    /* Updated to 'text' to match frontend JSON.stringify({ text: message }) */
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "No text provided" });
    }

    const userText = text.toLowerCase();

    /* STEP 1: Direct Genre Detection (Keyword matching) */
    const detectedGenre = availableGenres.find((genre) =>
      userText.includes(genre)
    );

    if (detectedGenre) {
      const filteredMovies = movies.filter((movie) => 
        movie.genre && movie.genre.toLowerCase().includes(detectedGenre)
      );

      return res.json({
        type: "genre",
        value: detectedGenre,
        movies: filteredMovies,
      });
    }

    /* STEP 2: AI Sentiment Analysis if no direct genre is found */
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Detect the mood of the user. Reply with only one word from: happy, sad, romantic, action, horror, motivational",
        },
        {
          role: "user",
          content: text,
        },
      ],
    });

    const mood = response.choices[0].message.content.trim().toLowerCase();
    const genres = moodToGenre[mood] || [];

    /* Filter movies that match any of the genres associated with the detected mood */
    const filteredMovies = movies.filter((movie) =>
      movie.genre && genres.includes(movie.genre.toLowerCase())
    );

    res.json({
      type: "mood",
      value: mood,
      movies: filteredMovies,
    });

  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ error: "AI processing error" });
  }
});

/* 6. SERVER STARTUP: Dynamic port selection for cloud deployment (Render) */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});