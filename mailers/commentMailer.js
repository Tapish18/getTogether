const nodemailer = require("../config/nodemailer")



exports.newComment = (commenterEmail,comment,user) => {
    // console.log(commenterEmail)

    let htmlString = nodemailer.renderTemplate({comment : comment,user : user}, "/comments/new_comments.ejs")

    nodemailer.transporter.sendMail({
        from : process.env.USER + "@gmail.com",
        to : commenterEmail,
        subject : "New Comment Added",
        html : htmlString
    }, (err,info) => {
        if(err){
            console.log("Error Occurred : ",err);
            return
        }

        console.log("Message Sent",info);
        return 
    })

}