const Comment = require("../models/comment");
const Post = require("../models/post");
const newComment = require("../mailers/commentMailer").newComment;
const queue = require("../config/kue");
const commentEmailWorker = require("../workers/comments_email_worker")


module.exports.create = async function (req,res){

    try {
        
        const fetchedPost = await Post.findById(req.body.post);

        if(fetchedPost){
            const createdComment = await Comment.create({
                content : req.body.content,
                user : req.user._id,
                post : req.body.post
            })
            console.log("Comment added Successfully.");
            if(fetchedPost.comment == undefined){
                fetchedPost.comment = [];
                fetchedPost.comment.push(createdComment);
                fetchedPost.save();
            }else{
                fetchedPost.comment.push(createdComment);
                fetchedPost.save();
            }

            if(req.xhr){
                // newComment(req.user.email,createdComment,req.user.name);
                let job = queue.create("emails",{
                    "commenterEmail" : req.user.email,
                    "comment" : createdComment,
                    "user" : req.user.name
                }).save(function(err){
                    if(err){
                        console.log("Error Occured in creating job : ",err);
                        return
                    }

                    console.log("Job Enqueued Successfully : ",job.id);
                    return
                })



                return res.status(200).json({
                    data : {
                        newComment : createdComment,
                        commentCreater : req.user.name,
                        postCreator : fetchedPost.user
                    },
                    message : "Comment Created"
                });
            }

        }else{
            console.log("No Such Post Exists");
        }

        return res.redirect("back");

    } catch (error) {
        console.log("Error Occurred : ",error);
        return res.redirect("back");
    }

    






    // Post.findById(req.body.post).then((fetchedPost) => {
    //     if(fetchedPost){
    //         Comment.create({
    //             content : req.body.content,
    //             user : req.user._id,
    //             post : req.body.post
    //         }).then((createdComment) => {
    //             console.log("Comment added Successfully.")
    //             if(fetchedPost.comment == undefined){
    //                 fetchedPost.comment = [];
    //                 fetchedPost.comment.push(createdComment);
    //                 fetchedPost.save();
    //             }else{
    //                 fetchedPost.comment.push(createdComment);
    //                 fetchedPost.save();
    //             }
    //             // console.log(fetchedPost);
    //         }).catch((err) => {
    //             console.log("Error occurred in creating Comment : ",err);
    //         })
    //         // return res.redirect("back");
    //     }else{
    //         Console.log("No Such Post Found.");
    //     }
    //     return res.redirect("back");
    // }).catch((err) => {
    //     console.log("Error Occurred in Finding Post : ",err);
    //     return res.redirect("back");
    // })
}

module.exports.destroy = async function(req,res){
    const cId = req.query.cmt_id;
    const pId = req.query.post_id;

    // console.log(pId);
    // console.log(req.user.id );

    try {
        let fetchedComment = await Comment.findById(cId);

        if(fetchedComment){
            if(pId == req.user.id || fetchedComment.user == req.user.id){
                const postId = fetchedComment.post;

                await fetchedComment.deleteOne()
                console.log(`${fetchedComment.content} comment deleted successfully!`);

                let fetchedPost = await Post.findById(postId);

                if(fetchedPost){
                    const commentids = fetchedPost.comment;
                    const newcommentids = commentids.filter((item) => {
                        return item != fetchedComment._id;
                    })

                    fetchedPost.comment = newcommentids;
                    fetchedPost.save()
                }

                if(req.xhr){
                    return res.status(200).json({
                        data : {
                            cmt_id : cId
                        },
                        message : "Comment Deleted"
                    })
                }

            }else{
                console.log("Not Authorized to delete this comment");
            }

            


        }else{
            console.log("No such comment exists!");
        }

        return res.redirect("back");
    } catch (error) {
        console.log("Error Occurred : ",error);
        return res.redirect("back");
    }

    





    // Comment.findById(cId).then((fetchedComment) => {
    //     if(fetchedComment){
    //         if(pId == req.user.id || fetchedComment.user == req.user.id){   // This Gives authorization to creater of the POST and the Creater of the Comment to Delete the Comment.
    //             const postId = fetchedComment.post;
    //             fetchedComment.deleteOne().then(() => {
    //                 console.log(`${fetchedComment.content} comment deleted successfully!`);
    //             }).catch((err) => {
    //                 console.log("Error in deleting Comment : ",err);
    //             });

    //             Post.findById(postId).then((fetchedPost) => {
    //                 if(fetchedPost){
    //                     const commentids = fetchedPost.comment;
    //                     const newcommentids = commentids.filter((item) => {
    //                         return item != fetchedComment._id;
    //                     })

    //                     fetchedPost.comment = newcommentids;
    //                     fetchedPost.save()
    //                 }
    //             }).catch((err) => {
    //                 console.log("Error in fetching post : ",err);
    //             });
    //         }else{
    //             console.log("Not Authorized to delete this comment");
    //         }

            
    //     }else{
    //         console.log("No such comment exists!");
    //     }
    //     return res.redirect("back");
    // }).catch((err) => {
    //     console.log("Error in fetching Comment : ",err);
    // })
}