const express = require("express");
const homeController = require("../controllers/home_controller");
const router = express.Router()


// to check router is loaded;

console.log("router loaded");


// adding rountes using router;

router.get("/",homeController.home);

// if this url doesnot match then use users router;
router.use("/users", require("./user"));

router.use("/posts",require("./posts"));
router.use("/comment",require("./comments"));

module.exports = router;