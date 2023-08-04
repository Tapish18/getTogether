const flash = require("connect-flash");


module.exports.setFlash = function(req,res,next){
    // console.log(1);
    // console.log(req.flash("success") , req.flash("success").length);
    // console.log(1);

    res.locals.flash = {
        "success" : req.flash("success"), // loads in array of messages corresponding to success key
        "error" : req.flash("error") // will be undefined since i have not set it up for now
         
    }

    // console.log({
    //     "success" : req.flash("success"), // loads in array of messages corresponding to success key
    //     "error" : req.flash("error")// will be undefined since i have not set it up for now
         
    // })

    next();
}