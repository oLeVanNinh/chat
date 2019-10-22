const express = require("express");
const router = express.Router();
const UserController = require("./user_controller");
const RoomsController = require("./rooms_controller");

router.get("/rooms", RoomsController.getRoomsHandle);
router.post("/room/create", RoomsController.createRoomsHandle);
router.post("/gen_token", UserController.post);

module.exports = router;
