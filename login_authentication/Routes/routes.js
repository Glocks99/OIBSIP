const router = require("express").Router()
const usermodel = require("../models/usermodels.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {permission} = require("../middleware/permission.js")

router.get("/",permission, (req,res) => {
    res.render("home")
})

router.get("/login", (req,res) => {
    res.render("login")
})

router.get("/signup", (req,res) => {
    res.render("signup")
})

router.post("/post-signup", async(req,res) => {
    const {username,email,password} = req.body
    const salt = await bcrypt.genSalt()
    const hashedPass = await bcrypt.hash(password, salt)
    const newData = await usermodel({
        username,
        email,
        password: hashedPass
    })
    await newData.save()
    .then(() => {
        res.redirect("/login")
    })
    .catch(err => {
        console.log(err.message)
    })
})

router.post("/post-login", async(req,res) => {
    const {username, password} = req.body
    const user = await usermodel.findOne({username})
    if(user){
        const isPassword = await bcrypt.compare(password, user.password)
        
        if(isPassword){
            jwt.sign({id: user._id}, "oasis", {}, (err, token) => {
                if(err){
                    res.redirect("/signup")
                    console.log(err.message)
                }
                else{
                    res.cookie("oasis_cookie", token)
                    res.redirect("/")
                }
            })
        }
        else{
            console.log("wrong password")
        }
    }
    else{
        console.log("user not found")
    }
})

module.exports = router