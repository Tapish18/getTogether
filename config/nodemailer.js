const nodemailer = require("nodemailer");
const ejs = require("ejs")
const path = require("path")

const transporter = nodemailer.createTransport({
    service : "gmail",
    host : "smtp.gmail.com",
    port : 587,
    secure : false,
    auth : {
        user : process.env.USER,
        pass : process.env.PASS
    }
})


const renderTemplate = (data,relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,"../views/mailers",relativePath),
        data,
        function(err,template){
            if(err){
                console.log("Error Occurred in rendering Template");
                return
            }

            mailHTML = template
        }


    )
    return mailHTML
}


module.exports = {
    transporter : transporter,
    renderTemplate : renderTemplate
}