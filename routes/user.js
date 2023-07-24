const express = require("express");
const userController = require("../controllers/users_controller")
const router = express.Router();



router.get("/profile",userController.profile);
router.get("/sign-up",userController.signUp)
router.get("/sign-in",userController.signIn)
router.post("/create",userController.create)
router.post("/authenticate",userController.mannualAuthentication)
router.get("/sign-out",userController.signOut)


module.exports = router;