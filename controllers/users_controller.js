const User = require("../models/user");

module.exports.profile = function (req,res){
    console.log(req.cookies.user_id);
    if(req.cookies.user_id != undefined){
        User.findOne({_id : req.cookies.user_id}).then((user) => {
            if(!user){
                return res.redirect("/users/sign-in");
            }else{
                return res.render("userprofile.ejs",{
                    title : "getTogether | My Profile",
                    name : user.name
                })
            }
        }).catch((err) => {
            console.log("Error occurred : ", err);
        })
    }else{
        return res.redirect("/users/sign-in"); 
    }
    
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

module.exports.mannualAuthentication = function(req,res){
    User.findOne({email : req.body.email}).then((user) => {
        if(!user){
            console.log("User not found!");
            return res.redirect("back");
        }else{
            console.log(user);
            if(user["password"] == req.body.password){
                console.log("Signin Successful!");
                res.cookie("user_id",user.id);
                return res.redirect("/users/profile");

            }else{
                console.log("Incorrect Password");
                return res.redirect("back");
            }
            
        }
    }).catch((err) => {
        console.log("Error Occured while Signing In : ",err);
        return res.redirect("back");
    })
}

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

module.exports.signOut = function(req,res){
    // delete req.cookies.user_id;
    // res.cookie("user_id",undefined);
    res.cookie('user_id', '', { expires: new Date(0) });
    return res.redirect("/users/sign-in");
}