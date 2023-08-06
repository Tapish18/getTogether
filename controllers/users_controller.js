const User = require("../models/user");

module.exports.profile = function (req,res){
    // return res.end("<h1>Users Profile Page!!</h1>")
    User.findById(req.params.id).then((fetchedUser) => {
        return res.render("profile.ejs",{
            title : "getTogether | My Profile",
            profile_user : fetchedUser
        })
    })

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

    if(req.isAuthenticated()){
        return res.redirect("/users/profile")
    }
    return res.render("signup.ejs",{
        title : "getTogether | SignUp"
    });
};

module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect("/users/profile")
    }
    return res.render("signin.ejs",{
        title : "getTogether | SignIn"
    });
};

module.exports.authenticate = function(req,res){
    console.log("Flash Called");
    req.flash("success","Logged In Successfully"); // This saves flash msg with key success as an array into the session cookie
    // console.log(req.session);
    // console.log(req.flash("success"));
    // console.log(req.session);
    return res.redirect("/");
}

module.exports.destroySession = function(req,res){
    req.logout(req.user, (err) => {
        if(err){
            console.log("Error Occured : ",err)
        }else{
            req.flash("success","Logged Out Successfully");
            return res.redirect("/");
        }
    })
}


module.exports.update = function (req,res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id , req.body).then((updatedUser) => {
            console.log("Updated user Succesfully!");
            console.log(req.body);
        }).catch((err) => {
            console.log("Unable to Update User Fields : ",err);
        })
        
    }else{
        console.log("User Not Authorized to Update!");
    }
    return res.redirect("back");
}