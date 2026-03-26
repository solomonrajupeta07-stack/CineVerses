const express = require("express");
const cors = require("cors");
const movies = require("./movies");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend working 🚀");
});

// ✅ GET ALL MOVIES
app.get("/movies", (req, res) => {
  res.json(movies);
});

// ✅ AI MOOD DETECTION
app.post("/mood", (req, res) => {
  const text = (req.body.text || "").toLowerCase();

  if (!text) {
    return res.json({ mood: "unknown", movies: [] });
  }

  // 🔥 STRONG MOOD KEYWORDS
  const moodMap = {
    comedy: [
      "happy","joy","fun","excited","great","awesome","fantastic",
      "cheerful","smile","laugh","enjoy","good","cool","nice","funny"
    ],
    drama: [
      "sad","depressed","cry","upset","lonely","hurt","pain",
      "bad","down","low","tired","emotional","stress","broken"
    ],
    action: [
      "thrill","adventure","exciting","energy","power","fight",
      "fast","rush","intense","hero","battle","win","war"
    ],
    romance: [
      "love","romantic","crush","relationship","kiss","date",
      "feelings","affection","heart","couple","miss"
    ],
    horror: [
      "fear","scary","ghost","dark","nightmare","terror",
      "haunted","creepy","kill","evil","danger","blood"
    ]
  };

  // ✅ INITIAL SCORES
  let scores = {
    comedy: 0,
    drama: 0,
    action: 0,
    romance: 0,
    horror: 0
  };

  // ✅ CLEAN TEXT (IMPORTANT FIX)
  const words = text
    .replace(/[^\w\s]/gi, "") // remove punctuation
    .toLowerCase()
    .split(/\s+/);

  // ✅ CALCULATE SCORES
  words.forEach(word => {
    for (let mood in moodMap) {
      if (moodMap[mood].includes(word)) {
        scores[mood]++;
      }
    }
  });

  // ✅ FIND BEST MOOD
  let detectedMood = "unknown";
  let maxScore = 0;

  for (let mood in scores) {
    if (scores[mood] > maxScore) {
      maxScore = scores[mood];
      detectedMood = mood;
    }
  }

  // ✅ FILTER MOVIES (FIXED FOR ARRAY GENRE)
  const filteredMovies =
    detectedMood === "unknown"
      ? []
      : movies.filter(movie =>
          movie.genre.includes(detectedMood)
        );

  // 🔍 DEBUG (OPTIONAL)
  console.log("Input:", text);
  console.log("Detected Mood:", detectedMood);
  console.log("Movies Found:", filteredMovies.length);

  // ✅ RESPONSE
  res.json({
    mood: detectedMood,
    movies: filteredMovies
  });
});

// ✅ START SERVER
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});