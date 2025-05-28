const express = require(`express`)
const app = express()
const PORT = 8000
const cors = require(`cors`)
const path = require(`path`)

app.use(cors())
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true })); // untuk menerima form body (x-www-form-urlencoded)

const userRoute = require(`./routes/user.route`)
const adminRoute = require(`./routes/admin.routes`)
const filmRoute = require(`./routes/film.routes`)
const orderRoute = require(`./routes/order.routes`)
const authRoute = require(`./routes/auth.routes`)

app.use(`/user`, userRoute) 
app.use(`/admin`, adminRoute) 
app.use(`/film`, filmRoute) 
app.use(`/order`, orderRoute) 
app.use(`/auth`, authRoute) 


app.listen(PORT, () => {
    console.log(`Server Flixnow berjalan di PORT ${PORT}`)
}) 
