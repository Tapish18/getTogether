const express = require("express");
const postController = require("../controllers/posts_controller");
const router = express.Router();


router.get("/myposts", postController.myposts);

module.exports = router;



