const express = require("express")
const app = express()
const session = require("express-session")
const passport = require("passport")
const mongoStore = require("connect-mongo")


app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(session({
    secret : process.env.SUPERSECRET,
    resave : false,
    saveUninitialized: true,
    store :mongoStore.create({
        mongoUrl : process.env.MONGODBURL,
        ttl : 10*60,
        autoRemove : "native"
    }) ,
   cookie : {
        httpOnly : true,
        secure : false,
        maxAge : 1000*60*10
    }
}))
app.use(passport.initialize())
app.use(passport.session())

require("./start/routes")(app)



module.exports = {
    app
}