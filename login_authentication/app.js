const express = require("express")
require("./models/db.js")
const router = require("./Routes/routes.js")
const cookieParser = require("cookie-parser")

const app = express()

app.set("view engine", "ejs")
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())
app.use(express.static("Public"))
app.use("/", router)


const port = 3000
app.listen(port, () => console.log("server is running"))