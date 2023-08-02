const Post = require("../models/post");
const User = require("../models/user")


module.exports.home = async function(req,res){
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

    try {
        let fetchedPosts = await Post.find({}).populate("user").populate({
            path : "comment",
            populate : {
                path : "user",
            }
        }
        )
        
        let fetchedUsers = await User.find({});
    
        let endFunc = async function (fetchedPosts,fetchedUsers){
            if(fetchedPosts){
                return res.render("home",{
                    title : "getTogether",
                    posts : fetchedPosts,
                    friends : fetchedUsers
                });
    
            }else{
                return res.render("home",{
                    title : "getTogether",
                    friends : fetchedUsers
                });
            }
        };
        
        await endFunc(fetchedPosts,fetchedUsers);
    } catch (error) {
        console.log("Error Occurred : ",error);
        return
    }

    

    // .then((fetchedPosts) => {

    //     .then((fetchedUsers) => {
            
    //     }).catch((err) => {
    //         console.log("Error Occurred in fetching Friends : ",err);
    //     })


        
    // }).catch((err) => {
    //     console.log("Error in finding posts : ",err);
    // })

    

    
    
};