require("dotenv").config();
const express = require("express");

const { validateMovie, validateUser } = require("./validators.js");

const { hashPassword } = require("./auth.js");
const app = express();

app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

app.get("/api/users", movieHandlers.getUsers);
app.get("/api/users/:id", movieHandlers.getUserById);

app.put("/api/movies/:id", validateMovie, movieHandlers.updateMovie);

app.put("/api/users/:id", validateUser, movieHandlers.updateUser);

app.post("/api/movies", validateMovie, movieHandlers.postMovie);

app.post("/api/users", hashPassword, movieHandlers.postUser);

app.delete("/api/movies/:id", movieHandlers.deleteMovie);

app.delete("/api/users/:id", movieHandlers.deleteUser);
