const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  roomIcon: { type: String, required: false },
  userIds: [mongoose.Schema.Types.ObjectId],
  messageIds: [mongoose.Schema.Types.ObjectId]
})

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
