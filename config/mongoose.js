const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1/Social_media_website");

const db = mongoose.connection;

db.on("error",console.error.bind(console,"Error Connecting To Database"))

db.once("open",function(){
    console.log("Successfully Connected to Database.")
})