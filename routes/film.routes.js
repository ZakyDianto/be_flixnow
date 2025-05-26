const express = require(`express`)
const app = express()
app.use(express.json())
const filmController = require(`../controllers/film.controller`)
app.get("/", filmController.getAllFilms)
app.post("/", filmController.addFilm)
app.post("/find", filmController.findFilm)
app.post("/find/:id", filmController.findFilm)
app.put("/:id", filmController.updateFilm)
app.delete("/:id", filmController.deleteFilm)
module.exports = app

