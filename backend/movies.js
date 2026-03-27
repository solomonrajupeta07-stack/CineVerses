const movies = [
  {
    name: "The Hangover",
    genre: ["comedy"],
    language: "English",
    rating: 7.7,
    overview: "Three friends wake up after a wild bachelor party in Las Vegas.",
    poster: "https://image.tmdb.org/t/p/w500/uluhlXubGu1VxU63X9VHCLWDAYP.jpg"
  },
  {
    name: "Superbad",
    genre: ["comedy"],
    language: "English",
    rating: 7.6,
    overview: "Two high school friends plan a big party night.",
    poster: "https://image.tmdb.org/t/p/w500/ek8e8txUyUwd2BNqj6lFEerJfbq.jpg"
  },
  {
    name: "Titanic",
    genre: ["romance", "drama"],
    language: "English",
    rating: 7.9,
    overview: "A love story aboard Titanic.",
    poster: "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg"
  },
  {
    name: "The Notebook",
    genre: ["romance"],
    language: "English",
    rating: 7.8,
    overview: "A touching love story.",
    poster: "https://image.tmdb.org/t/p/w500/qom1SZSENdmHFNZBXbtJAU0WTlC.jpg"
  },
  {
    name: "Avengers: Endgame",
    genre: ["action"],
    language: "English",
    rating: 8.4,
    overview: "Avengers unite to defeat Thanos.",
    poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg"
  },
  {
    name: "Mad Max: Fury Road",
    genre: ["action"],
    language: "English",
    rating: 8.1,
    overview: "Post-apocalyptic survival action.",
    poster: "https://image.tmdb.org/t/p/w500/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg"
  },
  {
    name: "The Conjuring",
    genre: ["horror"],
    language: "English",
    rating: 7.5,
    overview: "Paranormal investigation.",
    poster: "https://image.tmdb.org/t/p/w500/wVYREutTvI2tmxr6ujrHT704wGF.jpg"
  },
  {
    name: "It",
    genre: ["horror"],
    language: "English",
    rating: 7.3,
    overview: "Kids face a terrifying clown.",
    poster: "https://image.tmdb.org/t/p/w500/9E2y5Q7WlCVNEhP5GiVTjhEhx1o.jpg"
  },
  {
    name: "The Pursuit of Happyness",
    genre: ["drama"],
    language: "English",
    rating: 8.0,
    overview: "A father struggles for a better life.",
    poster: "https://image.tmdb.org/t/p/w500/gKkXqF0F6lG9H9r8P6V9K8N2K1L.jpg"
  },
  {
    name: "Joker",
    genre: ["drama"],
    language: "English",
    rating: 8.4,
    overview: "A man becomes a criminal mastermind.",
    poster: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
  },
  {
    name: "Pushpa: The Rise",
    genre: ["action", "drama"],
    language: "Telugu",
    rating: 7.6,
    overview: "A laborer rises through the ranks of a red sandal smuggling syndicate.",
    poster: "https://image.tmdb.org/t/p/w500/781v67u9u637pIEYIu60u9YfK9l.jpg"
  },
  {
    name: "3 Idiots",
    genre: ["comedy", "drama"],
    language: "Hindi",
    rating: 8.4,
    overview: "Two friends search for their long-lost companion while revisiting college memories.",
    poster: "https://image.tmdb.org/t/p/w500/6679998p87879.jpg" 
  },
  {
    name: "Bahubali: The Beginning",
    genre: ["action"],
    language: "Telugu",
    rating: 8.0,
    overview: "A child is rescued from a waterfall and grows up to be a legendary warrior.",
    poster: "https://image.tmdb.org/t/p/w500/9BAuO7H8D9SWHCxN6A91pW99m9H.jpg"
  },
  {
    name: "Dangal",
    genre: ["drama"],
    language: "Hindi",
    rating: 8.3,
    overview: "A former wrestler trains his daughters for the Commonwealth Games.",
    poster: "https://image.tmdb.org/t/p/w500/pAInqU80V6v1C8XbWw4Y1NfBOfZ.jpg"
  },
  {
    name: "Deadpool",
    genre: ["action", "comedy"],
    language: "English",
    rating: 8.0,
    overview: "A wisecracking mercenary gets experimental surgery and seeks revenge.",
    poster: "https://image.tmdb.org/t/p/w500/3E2S2Base91pW99m9H9BAuO7H.jpg"
  },
  {
    name: "Hereditary",
    genre: ["horror"],
    language: "English",
    rating: 7.3,
    overview: "A grieving family is haunted by tragic and disturbing occurrences.",
    poster: "https://image.tmdb.org/t/p/w500/7S9u6lU637pIEYIu60u9YfK9l.jpg"
  },
  {
    name: "RRR",
    genre: ["action", "drama"],
    language: "Telugu",
    rating: 8.0,
    overview: "A tale of two legendary revolutionaries and their journey away from home.",
    poster: "https://image.tmdb.org/t/p/w500/nEu998787878.jpg"
  },
  {
    name: "The Lunchbox",
    genre: ["romance", "drama"],
    language: "Hindi",
    rating: 7.8,
    overview: "A mistaken delivery in Mumbai's lunchbox service leads to a letter friendship.",
    poster: "https://image.tmdb.org/t/p/w500/6O9u6lU637pIEYIu60u9YfK9l.jpg"
  },
  {
    name: "Scream",
    genre: ["horror"],
    language: "English",
    rating: 7.2,
    overview: "A year after her mother's death, a girl is terrorized by a masked killer.",
    poster: "https://image.tmdb.org/t/p/w500/9BAuO7H8D9SWHCxN6A91pW99m9H.jpg"
  },
  {
    name: "La La Land",
    genre: ["romance", "drama"],
    language: "English",
    rating: 8.2,
    overview: "A pianist and an actress fall in love while pursuing their dreams in LA.",
    poster: "https://image.tmdb.org/t/p/w500/u7uE9D9SWHCxN6A91pW99m9H.jpg"
  },
  {
    name: "Inception",
    genre: ["action", "drama"],
    language: "English",
    rating: 8.8,
    overview: "A thief who steals corporate secrets through the use of dream-sharing technology.",
    poster: "https://image.tmdb.org/t/p/w500/edv5bs1pSdfS2SEDy9OGBn9EQcc.jpg"
  },
  {
    name: "Kalki 2898 AD",
    genre: ["action"],
    language: "Telugu",
    rating: 7.6,
    overview: "A modern-day avatar of Vishnu, a Hindu god, who is believed to have descended to earth to protect the world from evil forces.",
    poster: "https://image.tmdb.org/t/p/w500/69U9ZpSdfS2SEDy9OGBn9EQcc.jpg"
  },
  {
    name: "Drishyam",
    genre: ["drama"],
    language: "Hindi",
    rating: 8.2,
    overview: "A man goes to extreme lengths to save his family from punishment after they commit an accidental crime.",
    poster: "https://image.tmdb.org/t/p/w500/vX9ZpSdfS2SEDy9OGBn9EQcc.jpg"
  },
  {
    name: "The Dark Knight",
    genre: ["action", "drama"],
    language: "English",
    rating: 9.0,
    overview: "Batman raises the stakes in his war on crime with the help of Lt. Jim Gordon and District Attorney Harvey Dent.",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDp9QEQbvNlvpSdfS2.jpg"
  },
  {
    name: "Sita Ramam",
    genre: ["romance", "drama"],
    language: "Telugu",
    rating: 8.6,
    overview: "An orphan soldier's life changes after he receives a letter from a girl named Sita.",
    poster: "https://image.tmdb.org/t/p/w500/890mG9pfYmS97vM2R8Syz7SLjS9.jpg"
  },
  {
    name: "Get Out",
    genre: ["horror"],
    language: "English",
    rating: 7.7,
    overview: "A young African-American visits his white girlfriend's parents for the weekend, where his confusion about their reception of him eventually reaches a boiling point.",
    poster: "https://image.tmdb.org/t/p/w500/t90Y3SdfS2SEDy9OGBn9EQcc.jpg"
  },
  {
    name: "Zindagi Na Milegi Dobara",
    genre: ["comedy", "drama"],
    language: "Hindi",
    rating: 8.1,
    overview: "Three friends decide to turn their fantasy vacation into reality after one of them gets engaged.",
    poster: "https://image.tmdb.org/t/p/w500/6O9u6lU637pIEYIu60u9YfK9l.jpg"
  },
  {
    name: "The Wolf of Wall Street",
    genre: ["comedy", "drama"],
    language: "English",
    rating: 8.2,
    overview: "Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker living the high life to his fall involving crime and corruption.",
    poster: "https://image.tmdb.org/t/p/w500/pAInqU80V6v1C8XbWw4Y1NfBOfZ.jpg"
  },
  {
    name: "Eega",
    genre: ["action", "comedy"],
    language: "Telugu",
    rating: 7.7,
    overview: "A murdered man is reincarnated as a housefly and seeks revenge on the billionaire who killed him.",
    poster: "https://image.tmdb.org/t/p/w500/9BAuO7H8D9SWHCxN6A91pW99m9H.jpg"
  },
  {
    name: "Lagaan",
    genre: ["drama"],
    language: "Hindi",
    rating: 8.1,
    overview: "The people of a small village in Victorian India stake their future on a game of cricket against their ruthless British rulers.",
    poster: "https://image.tmdb.org/t/p/w500/pAInqU80V6v1C8XbWw4Y1NfBOfZ.jpg"
  },
  {
    name: "Spider-Man: Across the Spider-Verse",
    genre: ["action"],
    language: "English",
    rating: 8.6,
    overview: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.",
    poster: "https://image.tmdb.org/t/p/w500/8Vt6mSdfS2SEDy9OGBn9EQcc.jpg"
  },
  {
    name: "Arjun Reddy",
    genre: ["romance", "drama"],
    language: "Telugu",
    rating: 8.0,
    overview: "A short-tempered surgical surgeon plunges into a spiral of self-destruction after his girlfriend is forced to marry another man.",
    poster: "https://image.tmdb.org/t/p/w500/781v67u9u637pIEYIu60u9YfK9l.jpg"
  },
  {
    name: "Andhadhun",
    genre: ["comedy", "drama"],
    language: "Hindi",
    rating: 8.2,
    overview: "A series of mysterious events change the life of a blind pianist who must now report a crime that he should technically not have witnessed.",
    poster: "https://image.tmdb.org/t/p/w500/6O9u6lU637pIEYIu60u9YfK9l.jpg"
  },
  {
    name: "A Quiet Place",
    genre: ["horror"],
    language: "English",
    rating: 7.5,
    overview: "In a post-apocalyptic world, a family is forced to live in silence while hiding from monsters with ultra-sensitive hearing.",
    poster: "https://image.tmdb.org/t/p/w500/n3ZpSdfS2SEDy9OGBn9EQcc.jpg"
  },
  {
    name: " Jersey",
    genre: ["drama"],
    language: "Telugu",
    rating: 8.5,
    overview: "A failed cricketer decides to revive his career in his late 30s to fulfill his son's wish for a jersey.",
    poster: "https://image.tmdb.org/t/p/w500/7S9u6lU637pIEYIu60u9YfK9l.jpg"
  },
  {
    name: "Queen",
    genre: ["comedy", "drama"],
    language: "Hindi",
    rating: 8.1,
    overview: "A Delhi girl from a traditional family sets out on a solo honeymoon after her marriage is called off.",
    poster: "https://image.tmdb.org/t/p/w500/6679998p87879.jpg"
  },
  {
    name: "Interstellar",
    genre: ["drama", "action"],
    language: "English",
    rating: 8.7,
    overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    poster: "https://image.tmdb.org/t/p/w500/gEU2Q6Y3SdfS2SEDy9OGBn9EQcc.jpg"
  },
  {
    name: "Mahanati",
    genre: ["drama"],
    language: "Telugu",
    rating: 8.5,
    overview: "The life story of South Indian actress Savitri, who reigned over the film industry for two decades.",
    poster: "https://image.tmdb.org/t/p/w500/u7uE9D9SWHCxN6A91pW99m9H.jpg"
  },
  {
    name: "Gully Boy",
    genre: ["drama"],
    language: "Hindi",
    rating: 7.9,
    overview: "A coming-of-age story based on the lives of street rappers in Mumbai.",
    poster: "https://image.tmdb.org/t/p/w500/lunchbox.jpg"
  },
  {
    name: "The Shining",
    genre: ["horror"],
    language: "English",
    rating: 8.4,
    overview: "A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence.",
    poster: "https://image.tmdb.org/t/p/w500/x9ZpSdfS2SEDy9OGBn9EQcc.jpg"
  }, 
  {
    name: "Parasite",
    genre: ["drama"],
    language: "English", // Often watched with English subs/dub in global databases
    rating: 8.5,
    overview: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    poster: "https://image.tmdb.org/t/p/w500/7IiTTj0nS2sZ26R9LzQv33qK1ic.jpg"
  },
  {
    name: "KGF: Chapter 1",
    genre: ["action", "drama"],
    language: "Telugu",
    rating: 8.2,
    overview: "In the 1970s, a fierce rebellious gangster rises against brutal oppression in the Kolar Gold Fields.",
    poster: "https://image.tmdb.org/t/p/w500/3997STocYvS9LBngpUo9Y4S67u6.jpg"
  },
  {
    name: "Dilwale Dulhania Le Jayenge",
    genre: ["romance", "drama"],
    language: "Hindi",
    rating: 8.6,
    overview: "Raj and Simran meet on a trip to Europe and fall in love, but Raj must win over Simran's strict father.",
    poster: "https://image.tmdb.org/t/p/w500/2CAL20mYmUoMv2vV4CY19z9W1Ym.jpg"
  },
  {
    name: "The Godfather",
    genre: ["drama"],
    language: "English",
    rating: 9.2,
    overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    poster: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enPvtpMvS3vXdxB.jpg"
  },
  {
    name: "Baahubali 2: The Conclusion",
    genre: ["action", "drama"],
    language: "Telugu",
    rating: 8.2,
    overview: "Shiva, the son of Bahubali, learns about his heritage and begins to look for answers to his questions.",
    poster: "https://image.tmdb.org/t/p/w500/379965.jpg" 
  },
  {
    name: "Sholay",
    genre: ["action", "comedy"],
    language: "Hindi",
    rating: 8.2,
    overview: "After his family is murdered by a notorious bandit, a former police officer enlists the help of two outlaws to capture him.",
    poster: "https://image.tmdb.org/t/p/w500/9BAuO7H8D9SWHCxN6A91pW99m9H.jpg"
  },
  {
    name: "Gladiator",
    genre: ["action", "drama"],
    language: "English",
    rating: 8.5,
    overview: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
    poster: "https://image.tmdb.org/t/p/w500/ty8TGRvS2S26R9LzQv33qK1ic.jpg"
  },
  {
    name: "Magadheera",
    genre: ["action", "romance"],
    language: "Telugu",
    rating: 7.7,
    overview: "A bike stuntman recalls his previous life as a warrior, and sets out to find his reincarnated love.",
    poster: "https://image.tmdb.org/t/p/w500/781v67u9u637pIEYIu60u9YfK9l.jpg"
  },
  {
    name: "My Name Is Khan",
    genre: ["drama", "romance"],
    language: "Hindi",
    rating: 7.9,
    overview: "An Indian Muslim man with Asperger's syndrome sets out on a journey across the US to meet the President.",
    poster: "https://image.tmdb.org/t/p/w500/6O9u6lU637pIEYIu60u9YfK9l.jpg"
  },
  {
    name: "The Silence of the Lambs",
    genre: ["horror", "drama"],
    language: "English",
    rating: 8.6,
    overview: "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
    poster: "https://image.tmdb.org/t/p/w500/uS9u6lU637pIEYIu60u9YfK9l.jpg"
  },
  {
    name: "Evaru",
    genre: ["drama"],
    language: "Telugu",
    rating: 8.1,
    overview: "A high-ranking police officer is tasked with investigating the murder of a senior officer, allegedly killed by a rape victim.",
    poster: "https://image.tmdb.org/t/p/w500/9BAuO7H8D9SWHCxN6A91pW99m9H.jpg"
  },
  {
    name: "Bajrangi Bhaijaan",
    genre: ["comedy", "drama"],
    language: "Hindi",
    rating: 8.1,
    overview: "An Indian man with a magnanimous heart takes a young mute Pakistani girl back to her homeland to reunite her with her family.",
    poster: "https://image.tmdb.org/t/p/w500/pAInqU80V6v1C8XbWw4Y1NfBOfZ.jpg"
  },
  {
    name: "Django Unchained",
    genre: ["action", "drama"],
    language: "English",
    rating: 8.5,
    overview: "With the help of a German bounty-hunter, a freed slave sets out to rescue his wife from a brutal plantation owner in Mississippi.",
    poster: "https://image.tmdb.org/t/p/w500/7oWY8SdfS2SEDy9OGBn9EQcc.jpg"
  },
  {
    name: "Pokiri",
    genre: ["action", "comedy"],
    language: "Telugu",
    rating: 8.0,
    overview: "An undercover police officer infiltrates a local gang to eliminate the city's crime syndicates.",
    poster: "https://image.tmdb.org/t/p/w500/890mG9pfYmS97vM2R8Syz7SLjS9.jpg"
  },
  {
    name: "Gangs of Wasseypur",
    genre: ["action", "drama"],
    language: "Hindi",
    rating: 8.2,
    overview: "A clash between Sultan and Shahid Khan leads to the expulsion of Khan from Wasseypur, igniting a deadly blood feud spanning three generations.",
    poster: "https://image.tmdb.org/t/p/w500/vX9ZpSdfS2SEDy9OGBn9EQcc.jpg"
  },
  {
    name: "The Exorcist",
    genre: ["horror"],
    language: "English",
    rating: 8.1,
    overview: "When a 12-year-old girl is possessed by a mysterious entity, her mother seeks the help of two priests to save her.",
    poster: "https://image.tmdb.org/t/p/w500/lh6SdfS2SEDy9OGBn9EQcc.jpg"
  },
  {
    name: "Bommarillu",
    genre: ["romance", "comedy"],
    language: "Telugu",
    rating: 8.2,
    overview: "A young man's life is overly controlled by his father, leading to complications when he falls in love with a free-spirited girl.",
    poster: "https://image.tmdb.org/t/p/w500/781v67u9u637pIEYIu60u9YfK9l.jpg"
  },
  {
    name: "Barfi!",
    genre: ["romance", "drama"],
    language: "Hindi",
    rating: 8.1,
    overview: "Three young people learn that love can neither be defined nor contained by society's norms of normal and abnormal.",
    poster: "https://image.tmdb.org/t/p/w500/6679998p87879.jpg"
  },
  {
    name: "John Wick",
    genre: ["action"],
    language: "English",
    rating: 7.4,
    overview: "An ex-hit-man comes out of retirement to track down the gangsters that killed his dog and took everything from him.",
    poster: "https://image.tmdb.org/t/p/w500/fZPSdfS2SEDy9OGBn9EQcc.jpg"
  },
  {
    name: "Goodachari",
    genre: ["action", "drama"],
    language: "Telugu",
    rating: 7.8,
    overview: "A young NSA agent is framed for the murder of his bosses and must fight to clear his name and stop a terrorist plot.",
    poster: "https://image.tmdb.org/t/p/w500/u7uE9D9SWHCxN6A91pW99m9H.jpg"
  },
  {
    name: "Vikram",
    genre: ["action", "drama"],
    language: "Telugu",
    rating: 8.3,
    overview: "A special agent investigates a murder committed by a masked group of serial killers.",
    poster: "https://image.tmdb.org/t/p/w500/r5ZpSdfS2SEDy9OGBn9EQcc.jpg"
  },
  {
    name: "The Conjuring 2",
    genre: ["horror"],
    language: "English",
    rating: 7.4,
    overview: "Ed and Lorraine Warren travel to North London to help a single mother raising four children alone in a house plagued by supernatural spirits.",
    poster: "https://image.tmdb.org/t/p/w500/7SdfS2SEDy9OGBn9EQcc.jpg"
  },
  {
    name: "Dil Chahta Hai",
    genre: ["comedy", "drama"],
    language: "Hindi",
    rating: 8.1,
    overview: "Three inseparable childhood friends are just out of college. Nothing comes between them - until they each fall in love.",
    poster: "https://image.tmdb.org/t/p/w500/6O9u6lU637pIEYIu60u9YfK9l.jpg"
  },
  {
    name: "Baby Driver",
    genre: ["action", "comedy"],
    language: "English",
    rating: 7.6,
    overview: "A talented getaway driver relies on the beat of his personal soundtrack to be the best in the game.",
    poster: "https://image.tmdb.org/t/p/w500/dN9ZpSdfS2SEDy9OGBn9EQcc.jpg"
  },
  {
    name: "Major",
    genre: ["action", "drama"],
    language: "Telugu",
    rating: 8.2,
    overview: "Based on the life of Major Sandeep Unnikrishnan, who was martyred in the 2008 Mumbai attacks.",
    poster: "https://image.tmdb.org/t/p/w500/u7uE9D9SWHCxN6A91pW99m9H.jpg"
  },
  {
    name: "Stree",
    genre: ["horror", "comedy"],
    language: "Hindi",
    rating: 7.6,
    overview: "In the town of Chanderi, men live in fear of a spirit named 'Stree' who abducts men at night during festivals.",
    poster: "https://image.tmdb.org/t/p/w500/6679998p87879.jpg"
  },
  {
    name: "About Time",
    genre: ["romance", "drama"],
    language: "English",
    rating: 7.8,
    overview: "At the age of 21, Tim discovers he can travel in time and change what happens and has happened in his own life.",
    poster: "https://image.tmdb.org/t/p/w500/7IiTTj0nS2sZ26R9LzQv33qK1ic.jpg"
  },
  {
    name: "Kushi",
    genre: ["romance", "comedy"],
    language: "Telugu",
    rating: 7.9,
    overview: "Two college students fall in love but their massive egos keep them apart for years.",
    poster: "https://image.tmdb.org/t/p/w500/890mG9pfYmS97vM2R8Syz7SLjS9.jpg"
  },
  {
    name: "Tumbbad",
    genre: ["horror", "drama"],
    language: "Hindi",
    rating: 8.2,
    overview: "A mythological story about a remote village and a man's search for a hidden treasure guarded by a cursed god.",
    poster: "https://image.tmdb.org/t/p/w500/vX9ZpSdfS2SEDy9OGBn9EQcc.jpg"
  },
  {
    name: "Deadpool 2",
    genre: ["action", "comedy"],
    language: "English",
    rating: 7.7,
    overview: "Foul-mouthed mutant mercenary Wade Wilson assembles a team of fellow mutant rogues to protect a young boy.",
    poster: "https://image.tmdb.org/t/p/w500/to0ZpSdfS2SEDy9OGBn9EQcc.jpg"
  },
  {
    name: "Athadu",
    genre: ["action", "drama"],
    language: "Telugu",
    rating: 8.2,
    overview: "A professional hitman is framed for a murder and hides in a small village, pretending to be a long-lost grandson.",
    poster: "https://image.tmdb.org/t/p/w500/781v67u9u637pIEYIu60u9YfK9l.jpg"
  },
  {
    name: "Bareilly Ki Barfi",
    genre: ["romance", "comedy"],
    language: "Hindi",
    rating: 7.5,
    overview: "A free-spirited girl falls in love with an author, leading to a hilarious love triangle in a small Indian town.",
    poster: "https://image.tmdb.org/t/p/w500/6O9u6lU637pIEYIu60u9YfK9l.jpg"
  },
  {
    name: "Everything Everywhere All At Once",
    genre: ["action", "comedy"],
    language: "English",
    rating: 7.8,
    overview: "A Chinese-American immigrant is swept up in an insane adventure, where she alone can save the world by exploring other universes.",
    poster: "https://image.tmdb.org/t/p/w500/fPSdfS2SEDy9OGBn9EQcc.jpg"
  },
  {
    name: "Fidaa",
    genre: ["romance", "drama"],
    language: "Telugu",
    rating: 7.5,
    overview: "An NRI medical student falls in love with a girl from a small village, but their different lifestyles create hurdles.",
    poster: "https://image.tmdb.org/t/p/w500/u7uE9D9SWHCxN6A91pW99m9H.jpg"
  },
  {
    name: "Drishyam 2",
    genre: ["drama"],
    language: "Hindi",
    rating: 8.2,
    overview: "A gripping tale of an investigation and a family which is threatened by it. Will Vijay Salgaonkar be able to protect his family this time?",
    poster: "https://image.tmdb.org/t/p/w500/vX9ZpSdfS2SEDy9OGBn9EQcc.jpg"
  },
  {
    name: "Barbarian",
    genre: ["horror"],
    language: "English",
    rating: 7.0,
    overview: "A woman staying at an Airbnb discovers that the house she has rented is not what it seems.",
    poster: "https://image.tmdb.org/t/p/w500/n3ZpSdfS2SEDy9OGBn9EQcc.jpg"
  },
  {
    name: "Geetha Govindam",
    genre: ["romance", "comedy"],
    language: "Telugu",
    rating: 7.7,
    overview: "An innocent young lecturer is misunderstood by a headstrong woman after an accidental incident.",
    poster: "https://image.tmdb.org/t/p/w500/781v67u9u637pIEYIu60u9YfK9l.jpg"
  },
  {
    name: "Chhichhore",
    genre: ["comedy", "drama"],
    language: "Hindi",
    rating: 8.3,
    overview: "A tragic incident forces Anirudh, a middle-aged man, to take a trip down memory lane and reminisce his college days.",
    poster: "https://image.tmdb.org/t/p/w500/6679998p87879.jpg"
  },
  {
    name: "Knives Out",
    genre: ["comedy", "drama"],
    language: "English",
    rating: 7.9,
    overview: "A detective investigates the death of a patriarch of an eccentric, combative family.",
    poster: "https://image.tmdb.org/t/p/w500/pAInqU80V6v1C8XbWw4Y1NfBOfZ.jpg"
  },
  {
    name: "Agent Sai Srinivasa Athreya",
    genre: ["comedy", "drama"],
    language: "Telugu",
    rating: 8.4,
    overview: "A brilliant, detective based in Nellore runs his own agency and solves a murder case involving unidentified bodies.",
    poster: "https://image.tmdb.org/t/p/w500/9BAuO7H8D9SWHCxN6A91pW99m9H.jpg"
  }
];

module.exports = movies;