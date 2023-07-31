const express = require("express");
const postController = require("../controllers/posts_controller");
const router = express.Router();

const passport = require("passport");


router.get("/myposts", postController.myposts);
router.post("/createpost",passport.checkAuthentication,postController.createPost);
router.get("/destroy/:id",passport.checkAuthentication,postController.destroy);

module.exports = router;



