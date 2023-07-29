const Comment = require("../models/comment");
const Post = require("../models/post");


module.exports.create = function (req,res){
    Post.findById(req.body.post).then((fetchedPost) => {
        if(fetchedPost){
            Comment.create({
                content : req.body.content,
                user : req.user,
                post : req.body.post
            }).then((createdComment) => {
                console.log("Comment added Successfully.")
                if(fetchedPost.comment == undefined){
                    fetchedPost.comment = [];
                    fetchedPost.comment.push(createdComment);
                    fetchedPost.save();
                }else{
                    fetchedPost.comment.push(createdComment);
                    fetchedPost.save();
                }
                // console.log(fetchedPost);
            }).catch((err) => {
                console.log("Error occurred in creating Comment : ",err);
            })
            // return res.redirect("back");
        }else{
            Console.log("No Such Post Found.");
        }
        return res.redirect("back");
    }).catch((err) => {
        console.log("Error Occurred in Finding Post : ",err);
        return res.redirect("back");
    })
}