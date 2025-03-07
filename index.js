const {connect} = require("./database")
const {app} = require("./app")

require("dotenv").config()

connect().then(()=>{
    app.on("error",(error)=>{
        console.log(error)
    })
    app.listen(process.env.PORT,()=>{
        console.log(`port is ${process.env.PORT}`)
    })
})