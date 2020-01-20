const express = require("express");
const router = express.Router();
const UserController = require("./user_controller");
const RoomsController = require("./rooms_controller");
const MessageController = require("./messages_controller");

// Handle routes for chat room
router.get("/rooms", RoomsController.getRoomsHandle);
router.post("/room/create", RoomsController.createRoomsHandle);
// Handle routes for user
router.get("/user_info", UserController.getUserInfo);
router.post("/login", UserController.createToken);
router.post("/registration", UserController.registration);
//  Hadle routes for message
router.get("/rooms/messages", MessageController.getRoomMessage);
router.post("/rooms/message/create", MessageController.createMessage);

module.exports = router;
