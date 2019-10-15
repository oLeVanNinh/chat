const mongoose = require("mongoose");

const conversationSchema = mongoose.Schema({
  owner_id: { type: String, require: true },
  messages: [Schema.Types.Mixed]
})

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
