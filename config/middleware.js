const flash = require("connect-flash");


module.exports.setFlash = function(req,res,next){
    // console.log(req.session);
    // console.log("My Obj");
    myObj = {
        "success" : req.flash("success"), // loads in array of messages corresponding to success key
        "error" : req.flash("error") // will be undefined since i have not set it up for now
         
    }
    res.locals.flash = myObj

    // console.log(myObj);

    next();
}