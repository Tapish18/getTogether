const Posts = require("../../../models/post")

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