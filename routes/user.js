const express = require("express");
const userController = require("../controllers/users_controller")
const router = express.Router();

const passport = require("passport");



router.get("/profile",passport.checkAuthentication,userController.profile);
router.get("/sign-up",userController.signUp);
// router.get("/sign-in",passport.isNotAuthenticated,userController.signIn); when using iNotAuthenticated custom function as a middleware!!
router.get("/sign-in",userController.signIn);
router.post("/create",userController.create);

// add passport middleware to the route
router.post("/authenticate",passport.authenticate(
    "local",
    {failureRedirect : "/users/sign-in"}
),userController.authenticate); // goes to homepage on successfull authentication

router.get("/sign-out",userController.destroySession);


module.exports = router;