const { create } = require("connect-mongo");
const Post = require("../models/post");
const User = require("../models/user");


module.exports.myposts = function(req,res){
    return res.end("<h1>These are your posts!!</h1>");
};


module.exports.createPost = function(req,res){
    User.findOne({_id : req.user._id}).then((user) => {
        console.log(user.name);
        Post.create({
            content : req.body.content,
            user : user._id
        }).then((createdpost) => {
            console.log("Post added Sucessfully!");
            console.log(createdpost);
        }).catch((error) => {
            console.log("Error Occurred : ", error);
        })
    }).catch((error) => {
        console.log("Error in Finding the User!!")
        console.log(error);
    })
    return res.redirect("back");
}