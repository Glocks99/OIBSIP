const jwt = require("jsonwebtoken")

async function permission(req,res,next){
    const {oasis_cookie} = req.cookies

    if(oasis_cookie){
        await jwt.verify(oasis_cookie, "oasis", {}, (err, _) => {
            if(err){
                console.log(err.message)
                res.redirect("/signup")
            }else{
                next()
            }
        })
    }else{
        res.redirect("/login")
    }

}

module.exports = {permission}