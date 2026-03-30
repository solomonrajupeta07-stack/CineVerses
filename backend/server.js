require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const movies = require("./movies");

const app = express();

/* 1. INITIALIZE GEMINI */
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(cors());
app.use(express.json());

/* Health Check for Render */
app.get("/", (req, res) => res.send("CineVerse Backend (Gemini 1.5 Flash) is Online"));

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

    /* ✅ Use Gemini 1.5 Flash (The current Free Tier model) */
    const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash" 
    });

    const prompt = `Analyze this text and identify the user's mood. 
    Respond with ONLY ONE word from this list: happy, sad, romantic, action, horror, motivational. 
    Text: "${text}"`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    /* Clean the text to remove any accidental punctuation or extra words */
    const mood = response.text().trim().toLowerCase().replace(/[^a-z]/g, "");

    console.log("Detected Mood:", mood);

    const genres = moodToGenre[mood] || [];
    const filteredMovies = movies.filter(movie => 
      movie.genre && genres.includes(movie.genre.toLowerCase())
    );

    res.json({
      type: "mood",
      value: mood,
      movies: filteredMovies,
    });

  } catch (error) {
    console.error("Gemini Error:", error.message);
    res.status(500).json({ error: "AI processing failed", details: error.message });
  }
});

/* 3. PORT BINDING */
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});