const { create } = require("connect-mongo");
const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");


module.exports.myposts = function (req, res) {
    return res.end("<h1>These are your posts!!</h1>");
};


module.exports.createPost = async function (req, res) {
    // console.log("Fucntion Called");

    try {
        let fetchedUser = await User.findOne({ _id: req.user._id });
        let post = await Post.create({
            content: req.body.content,
            user: fetchedUser._id
        })

        if(req.xhr){
            // req.flash("success","Post Created");
            return res.status(200).json({
                data : {
                    post : post,
                    creater : fetchedUser
                },
                message : "Post Created"
            });
        }

    } catch (error) {
        console.log("Error Occurred : ",error);
    }

    // User.findOne({ _id: req.user._id }).then((user) => {
    //     console.log(user.name);
    //     Post.create({
    //         content: req.body.content,
    //         user: user._id
    //     }).then((createdpost) => {
    //         console.log("Post added Sucessfully!");
    //         console.log(createdpost);
    //     }).catch((error) => {
    //         console.log("Error Occurred : ", error);
    //     })
    // }).catch((error) => {
    //     console.log("Error in Finding the User!!")
    //     console.log(error);
    // })

    

    return res.redirect("back");
}


module.exports.destroy = async function (req, res) {


    try {
        let fetchedPost = await Post.findById(req.params.id);
        if(fetchedPost){
            if(fetchedPost.user == req.user.id){
                const commentsIds = fetchedPost.comment;
                await fetchedPost.deleteOne()
                
                if (commentsIds.length > 0){
                    await Comment.deleteMany({ _id: { $in: commentsIds } })
                }

                if(req.xhr){
                    return res.status(200).json({
                        data : {
                            post_id : req.params.id
                        },
                        message : "Post Deleted"
                    });
                }

            }else{
                console.log("Not Authorised to delete the Post!");
            }
        }else{
            console.log("No such Post Found!");
        }
        return res.redirect("back");
    } catch (error) {
        console.log("Error Occurred : ",error);
        return res.redirect("back");
    }



    // Post.findById(req.params.id).then((fetchedPost) => {
    //     if (fetchedPost) {
    //         if (fetchedPost.user == req.user.id) {    // .id function converts the id into string.
    //             const commentsIds = fetchedPost.comment;
    //             fetchedPost.deleteOne().then(() => {
    //                 console.log(`Post with content "${fetchedPost.content}" deleted Successfully`);
    //             }).catch((err) => {
    //                 console.log("Error in Deleting Post : ", err);
    //             });
    //             Comment.deleteMany({ _id: { $in: commentsIds } }).then(() => {
    //                 console.log(`commnets of ${fetchedPost.content} deleted.`);
    //             }).catch((err) => {
    //                 console.log("Error Occurred in deleting Comments : ", err);
    //             })
    //         } else {
    //             console.log("Not Authorised to delete the Post!");
    //         }
    //         return res.redirect("back");
    //     } else {
    //         console.log("No such Post Found!");
    //     }
    // }).catch((err) => {
    //     console.log("Error Occurred in Finding the Post!! : ");
    // });
};