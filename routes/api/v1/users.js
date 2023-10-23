const express = require("express")
const router = express.Router()

const userApi = require("../../../controllers/api/v1/users");



router.post("/createsession",userApi.creatSession);

module.exports = router;