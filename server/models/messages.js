const moongoose = require('mongoose');

const messageSchema = new moongoose.Schema({
  sender: moongoose.Schema.Types.ObjectId,
  message: String
});

const Message = moongoose.model("Message", messageSchema);

module.exports = Message;
