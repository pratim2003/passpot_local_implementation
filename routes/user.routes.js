const router = require("express").Router()
const {register,logout} = require("../controllers/user.controllers")
// const passport = require("passport")
// require("../config/passport")(passport)
const {logMiddleWare,isAutheticated,isAdmin} = require("../middlewares/login.middleware")

router.post("/register",register)
router.post("/login",logMiddleWare,(req,res)=>{
    // console.log(req)
    return res.status(200).json({ message: "Login successful", success: true, user: req.user });
})
router.get("/secure",isAutheticated,(req,res)=>{
    return res.status(200).send(`${req.user.username} is autheticated`)
})
router.get("/admin",isAdmin,(req,res)=>{
    return res.status(200).send(`<h1>${req.user.username} is admin</h1>`)
})
router.delete("/logout",isAutheticated,logout)

module.exports = router