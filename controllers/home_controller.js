const Post = require("../models/post");
const User = require("../models/user")


module.exports.home = function(req,res){
    console.log(req.cookies);
    // res.cookie("user_id",50);


    if (req.user){
        Post.find({}).populate("user").then((fetchedPosts) => {
            if(fetchedPosts){
                return res.render("home",{
                    title : "getTogether",
                    posts : fetchedPosts
                });
    
            }else{
                return res.render("home",{
                    title : "getTogether",
                });
            }
        })
    }else{
        return res.render("home",{
            title : "getTogether",
        });
    }

    
    
};