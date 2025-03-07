const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    username : {type : String, required : true},
    password : {type : String,require : true}
},{timestamps : true})

userSchema.pre("save",async function(next) {
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isVerified = async function(password){
    return await bcrypt.compare(password,this.password)
}

const userModel = mongoose.model("user",userSchema)

module.exports = {
    userModel
}