require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const movies = require("./movies");

const app = express();

/* 1. INITIALIZE GEMINI (Use the 2026 Free Model) */
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(cors());
app.use(express.json());

/* Render Health Check */
app.get("/", (req, res) => res.send("CineVerse Backend (Gemini 3) is Online 🚀"));

const moodToGenre = {
  happy: ["comedy", "family"],
  sad: ["drama", "romance"],
  romantic: ["romance"],
  action: ["action", "thriller"],
  horror: ["horror", "thriller"],
  motivational: ["biography", "drama"],
};

/* 2. MOOD DETECTION ROUTE */
app.post("/mood", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "No text provided" });

    /* ✅ Use Gemini 3 Flash (Free Tier) */
    const model = genAI.getGenerativeModel({ 
        model: "gemini-3-flash-preview" 
    });

    const prompt = `Analyze this text and identify the user's mood. 
    Respond with ONLY ONE word from this list: happy, sad, romantic, action, horror, motivational. 
    Text: "${text}"`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    /* Stronger cleaning: keeps only letters to avoid 404/mapping errors */
    const rawMood = response.text().trim().toLowerCase();
    const mood = rawMood.match(/[a-z]+/g)?.[0] || "unknown";

    console.log("Detected Mood:", mood);

    const genres = moodToGenre[mood] || [];
    const filteredMovies = movies.filter(movie => {
      if (!movie.genre) return false;
      // Handle both string and array genres
      const movieGenres = Array.isArray(movie.genre) 
        ? movie.genre.map(g => g.toLowerCase()) 
        : [movie.genre.toLowerCase()];
      return genres.some(g => movieGenres.includes(g));
    });

    res.json({
      type: "mood",
      value: mood,
      movies: filteredMovies,
    });

  } catch (error) {
    console.error("Gemini API Error:", error.message);
    res.status(500).json({ error: "AI failed", details: error.message });
  }
});

/* 3. PORT BINDING FOR RENDER */
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});