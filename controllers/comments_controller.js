const Comment = require("../models/comment");
const Post = require("../models/post");


module.exports.create = function (req,res){
    Post.findById(req.body.post).then((fetchedPost) => {
        if(fetchedPost){
            Comment.create({
                content : req.body.content,
                user : req.user._id,
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

module.exports.destroy = function(req,res){
    Comment.findById(req.params.id).then((fetchedComment) => {
        if(fetchedComment){
            if(fetchedComment.user == req.user.id){
                const postId = fetchedComment.post;
                fetchedComment.deleteOne().then(() => {
                    console.log(`${fetchedComment.content} comment deleted successfully!`);
                }).catch((err) => {
                    console.log("Error in deleting Comment : ",err);
                });

                Post.findById(postId).then((fetchedPost) => {
                    if(fetchedPost){
                        const commentids = fetchedPost.comment;
                        const newcommentids = commentids.filter((item) => {
                            return item != fetchedComment._id;
                        })

                        fetchedPost.comment = newcommentids;
                        fetchedPost.save()
                    }
                }).catch((err) => {
                    console.log("Error in fetching post : ",err);
                });
            }else{
                console.log("Not Authorized to delete this comment");
            }

            
        }else{
            console.log("No such comment exists!");
        }
        return res.redirect("back");
    }).catch((err) => {
        console.log("Error in fetching Comment : ",err);
    })
}