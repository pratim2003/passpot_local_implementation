const passport = require("passport")
require("../config/passport")(passport)

module.exports.logMiddleWare = (req,res,next)=>{
    try {
        passport.authenticate("local",(err,user,info)=>{
            // console.log(user)
            if(err){
                console.log(err)
                return next(err)
            }
            if(!user) return res.status(401).json({success : false, message : info.message})
            req.login(user,(err)=>{
                if(err) return next(err)
                console.log(`user is ${user}`)
                // console.log(res)
                next()
            })
        })(req,res,next)
    } catch (error) {
        next(error)
    }
}


module.exports.isAutheticated = (req,res,next)=>{
    if(!req.isAuthenticated()) return res.status(401).json({message : "not authorized"})
    next()
}

module.exports.isAdmin = (req,res,next)=>{
    if(req.isAuthenticated() && req.user.admin){
        return next()
    }
    return res.status(401).json({message : `${req.user.username} is unautharized`})
}
