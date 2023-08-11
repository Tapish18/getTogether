const fs = require("fs");
const User = require("../models/user");
const path = require("path");

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
        req.flash("error","Incorrect Password Match");
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
                    // console.log("User Created!!!");
                    req.flash("success","User Created Successfully")
                    console.log(createdUser);
                    return res.redirect("back");
                }).catch((error) => {
                    console.log("Error Occurred : ",error);
                })
            }else{
                console.log("Username already exists!!");
                req.flash("error","Username Already Exists")
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


module.exports.update = async function (req,res){
    if(req.user.id == req.params.id){
        try{
            let fetchedUser = await User.findById(req.params.id);

            User.uploadAvatar(req,res,function(err){
                if(err){
                    console.log("Multer Error : ",err);
                }

                fetchedUser.name = req.body.name
                fetchedUser.email = req.body.email

                if(req.file){
                    if(fetchedUser.avatar){
                        let deletePath = path.join(__dirname,"../",fetchedUser.avatar)
                        if(fs.existsSync(deletePath)){
                            fs.unlinkSync(deletePath, function(err){
                                if(err){
                                    console.log("Error in Deleting prev file : ",err);
                                }else{
                                    console.log("File Deleted Successfully");
                                }
                                
                            })
                        }else{
                            // If control comes to this block means the avatar has been deleted mannually from local storage
                            fetchedUser.avatar = User.avatarPath + "/" + req.file.filename
                        }
                        
                    }
                    fetchedUser.avatar = User.avatarPath + "/" + req.file.filename
                }

                fetchedUser.save();
            });




        }catch(error){
            req.flash("error",error);
            console.log("Unable to Update User Fields : ",err);
        }

        return res.redirect("back");


    }else{
        console.log("User Not Authorized to Update!");
         req.flash("error","User Not Authorized to Update");
    }

    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id , req.body).then((updatedUser) => {
    //         console.log("Updated user Successfully!");
    //         req.flash("success","User Updated Successfully");
    //         console.log(req.body);
    //     }).catch((err) => {
    //         console.log("Unable to Update User Fields : ",err);
    //     })
        
    // }else{
    //     console.log("User Not Authorized to Update!");
    //     req.flash("error","User Not Authorized to Update");
    // }
    // return res.redirect("back");
}