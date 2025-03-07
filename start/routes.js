const userRouter = require("../routes/user.routes")


module.exports = function(app){
    app.use("/api/user",userRouter)
}