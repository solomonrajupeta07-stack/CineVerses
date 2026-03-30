require("dotenv").config();
const express = require("express");
const cors = require("cors");
const movies = require("./movies");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("CineVerse Backend Running 🚀");
});

/* 🎯 KEYWORD BASED SEARCH */
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

      if (word.includes("happy") || word.includes("fun") || word.includes("joy")) {
        genres.push("comedy", "family");
      }

      else if (word.includes("sad") || word.includes("cry") || word.includes("emotional")) {
        genres.push("drama", "romance");
      }

      else if (word.includes("love") || word.includes("romantic")) {
        genres.push("romance");
      }

      else if (word.includes("action") || word.includes("fight") || word.includes("thrill")) {
        genres.push("action", "thriller");
      }

      else if (word.includes("scary") || word.includes("horror") || word.includes("ghost")) {
        genres.push("horror");
      }

      else if (word.includes("motivat") || word.includes("inspir")) {
        genres.push("biography", "drama");
      }
    });

    if (genres.length === 0) genres = ["drama"];

    genres = [...new Set(genres)];

    const filteredMovies = movies.filter(movie => {
      const movieGenres = Array.isArray(movie.genre)
        ? movie.genre.map(g => g.toLowerCase())
        : [movie.genre.toLowerCase()];

      return genres.some(g => movieGenres.includes(g));
    });

    res.json(filteredMovies);

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

/* GET ALL */
app.get("/movies", (req, res) => {
  res.json(movies);
});

/* LANGUAGE FILTER */
app.get("/language/:lang", (req, res) => {
  const lang = req.params.lang.toLowerCase();

  const filtered = movies.filter(m =>
    m.language.toLowerCase() === lang
  );

  res.json(filtered);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});