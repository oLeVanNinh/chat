const express = require("express");
const router = express.Router();
const UserController = require("./user_controller");

router.post("/gen_token", UserController.post);

module.exports = router;
