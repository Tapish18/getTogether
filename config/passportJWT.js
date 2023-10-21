const passport = require("passport")
const passportStrategy = require("passport-jwt").Strategy;
const extractJWT = require("passport-jwt").ExtractJwt;
const User = require("../models/user");

const opts = {}
opts.jwtFromRequest = extractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;
console.log(opts)

passport.use(new passportStrategy(opts, async function(payLoadJWT,done){
    try{
        const foundUser = await User.findById(payLoadJWT._id)
        if(foundUser){
            return done(null,foundUser)
        }
        return done(null,false)
    }catch{
        console.log("error Occurred")
        return done(err);
    }
    
}))

module.exports = passport;