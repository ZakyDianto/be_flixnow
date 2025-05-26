const express = require(`express`)
const app = express()
app.use(express.json())


const userController = require(`../controllers/user.controller`)


app.get("/", userController.getAllUser)
app.post("/", userController.addUser)
app.post("/find", userController.findUser)
app.put("/:id", userController.updateUser)
app.delete("/:id", userController.deleteUser)

module.exports = app
