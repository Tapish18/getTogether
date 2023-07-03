const express = require("express");
const homeController = require("../controllers/home_controller");
const router = express.Router()


// to check router is loaded;

console.log("router loaded");


// adding rountes using router;

router.get("/",homeController.home);

module.exports = router;