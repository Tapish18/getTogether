const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user")


passport.use(new googleStrategy({
    clientID : process.env.CLIENTID,
    clientSecret : process.env.CLIENTSECRET,
    callbackURL : "http://localhost:8000/users/auth/google/callback",

},async function(accesToken , refreshToken, profile,done){
    
    try {
        console.log(profile);
        const fetchedUser = await User.findOne({email : profile.emails[0].value})

        if(fetchedUser){
            return done(null,fetchedUser)
        }

        const newUser = await User.create({
            email : profile.emails[0].value,
            password : crypto.randomBytes(20).toString("hex"),
            name : profile.displayName
        }) 

        console.log("New User Created Successfully")
        return done(null,newUser)


    } catch (error) {
        console,log("Error Occurred : ",err);
        return done(err);
    }
    
    

    // User.findOne({email : profile.emails[0].value}).exec(function(fetchedUser,err){
    //     if(err){
    //         console.log("Erron in passport-google-strategy ",err);
    //         return done(err)
    //     }

        

    //     if(fetchedUser){
    //         return done(null,fetchedUser)
    //     }
    //     const newUser = User.create({
    //         email : profile.emails[0].value,
    //         name : profile.displayName,
    //         password :crypto.randomBytes(20).toString("hex")
    
    //     },function(err,createdUser){
    //         if(err){
    //             console.log("Erron in createing User passport-google-strategy ",err);
    //             return done(err)
    //         }
    //         return done(null,createdUser)
    //     })

    // })

    
    
}))


module.exports = passport;