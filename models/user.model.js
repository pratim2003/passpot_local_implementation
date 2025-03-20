const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const {enc_dec} = require("../utils/enc_dec")

const userSchema = new mongoose.Schema({
    username : {type : String, required : true},
    password : {type : String,require : true},
    admin : {type : Boolean,default : false}
},{timestamps : true})

userSchema.pre("save",async function(next) {
    if(!(this.isModified("password") && this.isModified("username"))) return next()
    this.username = enc_dec.encrypt(this.username,enc_dec.secrectKey)
    this.password = enc_dec.encrypt(this.password,enc_dec.secrectKey)
    next()
})

userSchema.methods.isVerified = async function(password){
    return enc_dec.decrypt(this.password,enc_dec.secrectKey)==password ? true : false
}

const userModel = mongoose.model("user",userSchema)

module.exports = {
    userModel
}