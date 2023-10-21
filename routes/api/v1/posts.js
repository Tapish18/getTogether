const express = require("express")
const router = express.Router()

const postsApi = require("../../../controllers/api/v1/posts")


console.log("postsapi controller called");
router.get("/",postsApi.index);


module.exports = router;