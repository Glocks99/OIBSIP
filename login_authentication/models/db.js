const mongoose = require("mongoose")

mongoose.connect("mongodb://0.0.0.0:27017/oasis")
.then(() => {
    console.log("mongodb is connected")
})
.catch(err => {
    console.log(err.message)
})