require("dotenv").config();
const express = require("express");
const cors = require("cors");
const movies = require("./movies");

const app = express();

app.use(cors());
app.use(express.json());

/* ✅ Health Check */
app.get("/", (req, res) => {
  res.send("CineVerse Backend (Keyword Based) Running 🚀");
});

/* 🎯 KEYWORD → GENRE LOGIC */
app.post("/mood", (req, res) => {
  try {
    const { mood } = req.body;

    if (!mood) {
      return res.status(400).json({ error: "Mood is required" });
    }

    const input = mood.toLowerCase().replace(/[^\w\s]/gi, "");
    const words = input.split(" ");

    let genres = [];

    words.forEach(word => {

      // 😊 HAPPY
      if (word.includes("happy") || word.includes("joy") || word.includes("fun") || word.includes("smile") || word.includes("good")) {
        genres.push("comedy", "family");
      }

      // 😢 SAD
      else if (word.includes("sad") || word.includes("cry") || word.includes("emotional") || word.includes("depress") || word.includes("lonely")) {
        genres.push("drama", "romance");
      }

      // ❤️ ROMANCE
      else if (word.includes("love") || word.includes("romantic") || word.includes("crush") || word.includes("relationship")) {
        genres.push("romance");
      }

      // 🔥 ACTION
      else if (word.includes("action") || word.includes("fight") || word.includes("excited") || word.includes("thrill") || word.includes("adventure")) {
        genres.push("action", "thriller");
      }

      // 😱 HORROR
      else if (word.includes("scared") || word.includes("fear") || word.includes("horror") || word.includes("ghost") || word.includes("dark")) {
        genres.push("horror", "thriller");
      }

      // 💪 MOTIVATION
      else if (word.includes("motivat") || word.includes("inspir") || word.includes("success") || word.includes("goal") || word.includes("dream")) {
        genres.push("biography", "drama");
      }
    });

    if (genres.length === 0) {
      genres = ["drama"];
    }

    genres = [...new Set(genres)];

    const filteredMovies = movies.filter(movie => {
      if (!movie.genre) return false;

      const movieGenres = Array.isArray(movie.genre)
        ? movie.genre.map(g => g.toLowerCase())
        : [movie.genre.toLowerCase()];

      return genres.some(g => movieGenres.includes(g));
    });

    res.json(filteredMovies);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

/* ✅ GET ALL MOVIES */
app.get("/movies", (req, res) => {
  res.json(movies);
});

/* ✅ LANGUAGE FILTER */
app.get("/language/:lang", (req, res) => {
  const lang = req.params.lang.toLowerCase();

  const filtered = movies.filter(m =>
    m.language && m.language.toLowerCase() === lang
  );

  res.json(filtered);
});

/* ✅ START SERVER */
const PORT = process.env.PORT || 10000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});