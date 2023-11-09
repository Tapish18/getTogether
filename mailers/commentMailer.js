const nodemailer = require("../config/nodemailer")



exports.newComment = (commenterEmail) => {
    console.log(commenterEmail)

    nodemailer.transporter.sendMail({
        from : process.env.USER + "@gmail.com",
        to : commenterEmail,
        subject : "New Comment Added",
        html : "<h1>Yeah, Your Comment has been Published on getTogether</h1>"
    }, (err,info) => {
        if(err){
            console.log("Error Occurred : ",err);
            return
        }

        console.log("Mesage Sent",info);
        return 
    })

}