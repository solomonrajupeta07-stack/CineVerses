const express = require("express");
const cors = require("cors");
const movies = require("./movies");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ 1. DEBUGGING MIDDLEWARE (See every request in your terminal)
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  if (req.method === "POST") console.log("Body:", req.body);
  next();
});

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend working 🚀");
});

// ✅ GET ALL MOVIES
app.get("/movies", (req, res) => {
  res.json(movies);
});

// ✅ LANGUAGE FILTER (Moved up for better organization)
app.get("/language/:lang", (req, res) => {
  const lang = req.params.lang.toLowerCase();
  const filteredMovies = movies.filter(
    movie => movie.language && movie.language.toLowerCase() === lang
  );
  res.json(filteredMovies);
});

// ✅ AI MOOD DETECTION
app.post("/mood", (req, res) => {
  try {
    // 🔧 FIX: Check for BOTH 'text' or 'mood' to prevent frontend mismatch
    const userInput = req.body.text || req.body.mood || ""; 
    const text = userInput.toLowerCase();

    if (!text) {
      return res.json({ mood: "unknown", movies: [] });
    }

    const moodMap = {
      comedy: ["happy","joy","fun","excited","great","awesome","fantastic","cheerful","smile","laugh","enjoy","good","cool","nice","funny"],
      drama: ["sad","depressed","cry","upset","lonely","hurt","pain","bad","down","low","tired","emotional","stress","broken"],
      action: ["thrill","adventure","exciting","energy","power","fight","fast","rush","intense","hero","battle","win","war"],
      romance: ["love","romantic","crush","relationship","kiss","date","feelings","affection","heart","couple","miss"],
      horror: ["fear","scary","ghost","dark","nightmare","terror","haunted","creepy","kill","evil","danger","blood"]
    };

    let scores = { comedy: 0, drama: 0, action: 0, romance: 0, horror: 0 };

    // Clean text and split into words
    const words = text.replace(/[^\w\s]/gi, "").split(/\s+/);

    words.forEach(word => {
      for (let mood in moodMap) {
        if (moodMap[mood].includes(word)) scores[mood]++;
      }
    });

    let detectedMood = "unknown";
    let maxScore = 0;

    for (let mood in scores) {
      if (scores[mood] > maxScore) {
        maxScore = scores[mood];
        detectedMood = mood;
      }
    }

    // Filter movies based on genre
   const filteredMovies =
  detectedMood === "unknown"
    ? []
    : movies.filter(movie => {
        // 1. Ensure movie.genre exists and is an array
        if (!movie.genre || !Array.isArray(movie.genre)) return false;

        // 2. Check if any genre in the array matches the detected mood
        return movie.genre.some(g => g.toLowerCase() === detectedMood.toLowerCase());
      });

    console.log(`Detected: ${detectedMood} | Found: ${filteredMovies.length} movies`);
    res.json({ mood: detectedMood, movies: filteredMovies });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ RENDER COMPATIBLE PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});