const User = require("../models/user");

module.exports.profile = function (req,res){
    return res.end("<h1>Users Profile Page!!</h1>")
};

module.exports.create = function(req,res){
    if(req.body.password != req.body.ConfirmPassword){
        return res.redirect("back");
    }

    User.findOne({email : req.body.email}).then(
        (user) => {
            if(!user){
                User.create({
                    name : req.body.name,
                    email : req.body.email,
                    password : req.body.password
                }).then((createdUser) => {
                    console.log("User Created!!!");
                    console.log(createdUser);
                    return res.redirect("back");
                }).catch((error) => {
                    console.log("Error Occurred : ",error);
                })
            }else{
                console.log("Username already exists!!");
                return res.redirect("back");
            }
        }
    ).catch((err) => {
        console.log("Error Occured", err);
        return res.redirect("back");
    })

   
};

module.exports.signUp = function(req,res){
    return res.render("signup.ejs",{
        title : "getTogether | SignUp"
    });
};

module.exports.signIn = function(req,res){
    return res.render("signin.ejs",{
        title : "getTogether | SignIn"
    });
};