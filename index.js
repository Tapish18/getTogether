const exp = require("constants");
const path = require("path");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const port = 8000; // on production level port No- 80 is used.

const app = express();
const db = require("./config/mongoose");
const cookieParser = require("cookie-parser");

const Session = require("express-session");
const passport = require("passport");
const PassportLocalStrategy = require("./config/passport-local-strategy");
const MongoStore = require("connect-mongo");

const flash = require("connect-flash");
const customMWare = require("./config/middleware");

// setting views engine and views folder;

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"/views"));

app.use(expressLayouts);


//setting statics folder;

app.use(express.static("statics"));
app.use("/uploads",express.static(path.join(__dirname + "/uploads")));

//add urlencoder middleware to app

app.use(express.urlencoded({extended : true}));

// add cookie-parser to the app;

app.use(cookieParser());

// setting session configuration

app.use(Session({
    name : "getTogether",
    secret : "blahomething",//todo later
    saveUninitialized : false,
    resave : false,
    // cookie: { secure: false },
    cookie : {
        maxAge : (1000 * 60 * 100) // mili secs
    },
    store : MongoStore.create({
        mongoUrl : "mongodb://127.0.0.1/Social_media_website",
        autoRemove : "disabled",
    }, function(err){   // callback function in case of error
        console.log(err || "connect-mongodb setup ok");
    })
}))

app.use(passport.initialize())
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMWare.setFlash);




// adding express.router . This is a middleware which starts before the start of server!

app.use("/",require("./routes/index"));



app.listen(port,function(err){
    if (err){
        console.log(`Error Occurred : ${err}`);
        return;
    }

    console.log(`Server started successfully at port : ${port}`);
    return;
})