const exp = require("constants");
const express = require("express");
const port = 8000; // on production level port No- 80 is used.

const app = express();



app.listen(port,function(err){
    if (err){
        console.log(`Error Occurred : ${err}`);
        return;
    }

    console.log(`Server started successfully at port : ${port}`);
    return;
})