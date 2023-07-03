const exp = require("constants");
const express = require("express");
const port = 8000; // on production level port No- 80 is used.

const app = express();

// adding express.router . This is a middleware which starts before the start of server!!

app.use("/",require("./routes/index"));



app.listen(port,function(err){
    if (err){
        console.log(`Error Occurred : ${err}`);
        return;
    }

    console.log(`Server started successfully at port : ${port}`);
    return;
})