const Joi = require("joi")
const {userModel} = require("../models/user.model")
const {enc_dec} = require("../utils/enc_dec")
// const passport = require("passport")


module.exports.register = async(req,res)=>{
    let {error,value} = Joi.object({
        username : Joi.string().required(),
        password : Joi.string().required()
    }).validate(req.body)
    if(error) return res.status(400).json(error.message)
    try {
        if(await userModel.findOne({username : req.body.username})) return res.status(400).json({message : "user already exists"})
        const data = await userModel.create({
            username : req.body.username,
            password : req.body.password
        })
        return res.status(200).json({data})
    } catch (error) {
        console.log(error)
    }
}

module.exports.logout = async(req,res,next)=>{
    try {
        await req.logout((err)=>{
            if(err) return next(err)
            return res.status(200).json({message : "logged out successfull"})
        })
    } catch (error) {
        console.log(error)
    }
}

