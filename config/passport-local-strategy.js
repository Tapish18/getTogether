const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");
// Authenticating using passport Local Strategy
passport.use(new LocalStrategy({
    usernameField : "email"       // This tells passwort that email in login form will be treated as username for the authentication;
},function (email,password,done){
    User.findOne({email : email}).then((user) => {
        if(!user || password != user.password){
            console.log("Invalid Username/Password");
            return done(null,false);
        }

        return done(null,user);
    }).catch((err) => {
        console.log("error in finding user --> passport");
        return done(err);
    })
}));

// Now we need to serialize the user i.e, add the encrypted verion of user_id to the cookie

passport.serializeUser(function(user,done){
    done(null,user.id);
});


// After the info about user's identity is passed on to the passport , we are required to decentrailize it for further use. it's args are id (which it decrypts itself) and the done callback function

passport.deserializeUser(function(id, done){
    User.findById(id).then((user) => {
        return done(null,user);
    }).catch((error) => {
        console.log("Erron in finding user");
        return done(error);
    })
})


// Now export the Passport Library

module.exports = passport;