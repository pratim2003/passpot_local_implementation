const { userModel } = require("../models/user.model")
// const passport = require("passport")
const localStatergy = require("passport-local").Strategy

module.exports = function(passport){
    passport.use(new localStatergy(
        async function(username,password,done){
            try {
                // console.log(username,password)
                const user = await userModel.findOne({username})
                if(!user) return done(null,false,{message : `${username} doest not exist`})
                if(!await user.isVerified(password)) return done(null,false,{message : `${password} is incorrect`})
                // console.log(await user.isVerified(password))
                // console.log(user)
                return done(null,user)
            } catch (error) {
                return done(error)
            }
        } 
    ))
    passport.serializeUser((user,done)=>{
        // console.log(user)
        return done(null,user.id)
    })
    passport.deserializeUser(async(id,done)=>{
        try {
            const user = await userModel.findById(id)
            // console.log(user)
            done(null,user)
        } catch (error) {
            done(error)
        }
    })
}