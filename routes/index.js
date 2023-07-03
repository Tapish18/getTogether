const express = require("express");
const homeController = require("../controllers/home_controller");
const router = express.Router()


// to check router is loaded;

console.log("router loaded");


// adding rountes using router;

router.get("/",homeController.home);

// if this url doesnot math then use users router;
router.use("/users", require("./user"));

module.exports = router;