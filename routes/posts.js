const express = require("express");
const postController = require("../controllers/posts_controller");
const router = express.Router();

const passport = require("passport");


router.get("/myposts", postController.myposts);
router.post("/createpost",postController.createPost);

module.exports = router;



