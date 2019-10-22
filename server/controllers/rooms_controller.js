const Room = require("../models/room");
const RoomController = {};

function getRoomsHandle(req, res, next) {
  Room.find({}, function(err, rooms) {
    if (err) {
      res.status(500);
      return res.json({
        success: false,
        message: 'Server internal error'
      })
    }
    else {
      return res.json({
        rooms: rooms
      })
    }
  })
}

function createRoomsHandle(req, res, next) {
  const roomName = req.body.roomName;

  console.log(roomName);

  if (!roomName) {
    res.status(401);
    return res.json({error: 'Name is require for room'});
  }

  Room.findOne({ name: roomName}, function(err, room) {
    if (err) { next(err) };
    if (room) {
      res.status(401);
      return res.json('Room is existed yet');
    }
  });

  const newRoom = new Room({
    name: roomName
  })

  newRoom.save();
  return res.json({ room: newRoom });
}

RoomController.getRoomsHandle = getRoomsHandle;
RoomController.createRoomsHandle = createRoomsHandle;

module.exports = RoomController;
