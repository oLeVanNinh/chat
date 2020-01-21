const Message = require('../models/messages');
const Room = require("../models/room");
const User = require("../models/user");
const MessageController = {};

function getRoomMessage(req, res, next) {
  const roomId = req.query.roomId;

  if (!roomId) {
    res.status = 401;
    return res.json({error: 'Room is not exist'});
  }

  Room.findById(roomId, async function(err, room) {
    if (err) { next(err) };

    if (room) {
      let msgIds = room.messageIds;
      const users =  await User.find({'_id': { $in: room.userIds }})

      Message.find({'_id': { $in: msgIds }}, function(err, msgs) {
        if (err) { next(err) };

        if (msgs) {
          return res.json({ messages: msgs, users: users });
        }
      });
    }
  })
}

function createMessage(req, res, next) {
  const roomId = req.body.roomId;
  const msg = req.body.message;

  if (!roomId) {
    res.status = 401;
    return res.json({error: 'Room is not exist'});
  }

  Room.findById(roomId, function(err, room) {
    if (err) { next(err) };

    if (room) {
      const newMessage = new Message({
        message: msg,
        sender: res.locals.user._id
      })

      newMessage.save();

      room.messageIds.push(newMessage._id);
      room.save();

      return res.json(newMessage);
    }
  })
}

MessageController.getRoomMessage = getRoomMessage;
MessageController.createMessage = createMessage;
module.exports = MessageController;
