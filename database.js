const mongoose = require("mongoose")
require("dotenv").config()

const connect = async()=>{
    await mongoose.connect(process.env.MONGODBURL).then(()=>console.log("databse connected")).catch((err)=>console.log(err))
}

module.exports = {
    connect
}