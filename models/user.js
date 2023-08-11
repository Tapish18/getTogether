const mongoose = require("mongoose");
const multer = require("multer")
const path = require("path")

const AVATAR_PATH = path.join("/uploads/users/avatars");

const userSchema = new mongoose.Schema({
    email :{
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    avatar : {
        type : String,
        default : undefined
    }
},{
    timestamps : true
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,"..",AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix); // File.fieldName is avatar as in user model
    }
  });

userSchema.statics.uploadAvatar = multer({storage : storage}).single("avatar"); // Asigning properties defined to multer for this project .We can actually send array of files . dot single ensures that only one file is uploaded with name avatar.
userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model("User",userSchema);


module.exports = User;