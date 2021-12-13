const express = require("express");

const app = express();

app.use(express.json());
 
const {login, register} = require("./controllers/auth.controller");

const movieController = require("./controllers/movie.controller");

const theaterController = require("./controllers/theater.conrtoller");

const showController = require("./controllers/show.controller");

const seatController = require("./controllers/seat.controller");

const screenController = require("./controllers/screen.controller");

const upload = require("./middlewares/upload");


app.use("/movies", movieController);

app.use("/theaters", theaterController);

app.use("/shows", showController);

app.use("/seats", seatController);

app.use("/screens", screenController);

app.post("/register", upload.single("image_url"), register);

app.post("/login", login);

module.exports = app;