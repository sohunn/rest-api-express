const express = require("express");
const { movies } = require("./movies");

const port = 3000;
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Congrats, you just consumed data from a REST API!");
});

app.post("/movies/create", (req, res) => {
  const { name, year, genres, boxOfficeHit } = req.body;

  // basic validation
  if (
    !name ||
    !year ||
    !genres?.length ||
    typeof boxOfficeHit === "undefined"
  ) {
    return res.sendStatus(400);
  }

  movies.push({ name, year, genres, boxOfficeHit });
  return res.json(movies);
});

app.get("/movie/:name", (req, res) => {
  const toSearch = req.params.name;
  const movie = movies.find((m) => m.name === toSearch);

  if (!movie) return res.sendStatus(404);
  return res.json(movie);
});

app.patch("/movie/:name/update", (req, res) => {
  const toSearch = req.params.name;
  const movie = movies.find((m) => m.name === toSearch);

  if (!movie) return res.sendStatus(404);

  const { year, genres, boxOfficeHit } = req.body;
  if (year) movie.year = year;
  if (genres) movie.genres = genres;
  if (typeof boxOfficeHit !== "undefined") movie.boxOfficeHit = boxOfficeHit;

  return res.json(movie);
});

app.listen(port, () => {
  console.log(`🚀 Express app listening on http://localhost:${port}`);
});
