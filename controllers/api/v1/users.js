const User = require("../../../models/user")
const jwt = require("jsonwebtoken");


module.exports.creatSession = async function(req,res){
    try{
        let fetchedUser = await User.findOne({email : req.body.email});
        console.log(fetchedUser);
        if(!fetchedUser || fetchedUser.password != req.body.password){
            return res.status(422).json({
                message : "Invalid Username or Password",

            })
        }

        return res.status(200).json({
            message : "Successfull signIn",
            data : {
                token : jwt.sign(fetchedUser.toJSON(),process.env.SECRET , {expiresIn: "1000000"})
            }

        })
    }catch(err){

    }
    
}

