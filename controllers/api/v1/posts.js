const Posts = require("../../../models/post");
const Comment = require("../../../models/comment");
// const { post } = require("../../../routes/api/v1");

module.exports.index = async function(req,res){
    try{
        
        const fetchedPosts = await Posts.find();
        return res.status(200).json({
            message : "List of Posts",
            posts : fetchedPosts
        })
    }catch(err){
        console.log("error Ocuured" , err);
        return res.status(404).json({
            message : "Resource not found"
        })
    }
}


module.exports.destroy = async function(req,res){
    try{
        let fetchedPost = await Posts.findById(req.params.id)
        if(fetchedPost.user == req.user.id){
            let commentsArray = fetchedPost.comment;
            if(commentsArray.length > 0){
                Comment.deleteMany({post : req.params.id})
            }
            await fetchedPost.deleteOne()
            return res.status(200).json({
                message : "Post and corresponding Comments deleted successfully"
            })
        }else{
            return res.status(401).json({
                message : "Not Authorized to delete this post"
            })
        }
    }catch(err){
        console.log("Error Occurred : ",err);
        return res.status(500).json({
            message : "Internal Server Error"
        })
    }
}