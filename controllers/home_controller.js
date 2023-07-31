const Post = require("../models/post");
const User = require("../models/user")


module.exports.home = function(req,res){
    console.log(req.cookies);
    // res.cookie("user_id",50);


    // if (req.user){
    //     Post.find({}).populate("user").populate({
    //         path : "comment",
    //         populate : {
    //             path : "user",
    //         }
    //     }
    //     ).then((fetchedPosts) => {
    //         if(fetchedPosts){
    //             return res.render("home",{
    //                 title : "getTogether",
    //                 posts : fetchedPosts
    //             });
    
    //         }else{
    //             return res.render("home",{
    //                 title : "getTogether",
    //             });
    //         }
    //     })
    // }else{
    //     return res.render("home",{
    //         title : "getTogether",
    //     });
    // }

    Post.find({}).populate("user").populate({
        path : "comment",
        populate : {
            path : "user",
        }
    }
    ).then((fetchedPosts) => {
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
    }).catch((err) => {
        console.log("Error in finding posts : ",err);
    })

    

    
    
};