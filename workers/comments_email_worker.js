const queue = require("../config/kue");

const commentMailer = require("../mailers/commentMailer")

queue.process("emails",function(job,done){
    console.log("Processing the job using worker :",job.data);
    commentMailer.newComment(job.data.commenterEmail , job.data.comment,job.data.user)
    done();
})

