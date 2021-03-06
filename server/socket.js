const User = require('./models/user');
const Socket = {}
const users = {}

const connection = function(io) {
  io.on('connection', (socket) => {
    socket.on('connected', (u) => {
      User.findOne({ _id: u._id }).then(user => {
        user.status = true;
        user.save();

        changeUserStatus('online', user, socket);
      }).catch(err => console.log(err));
      users[socket.id] = u._id;
    });

    socket.on('join', (data) => {
      socket.join(data.roomId);
      socket.broadcast.to(data.roomId).emit('join room', data.userId);
    });

    socket.on('leave', (roomId) => {
      socket.leave(roomId);
    });

    socket.on('message', (data) => {
      socket.broadcast.to(data.roomId).emit('chat message', data);
    });

    socket.on('disconnect', () => {
      const userId = users[socket.id];
      if (userId) {
        User.findOne({_id: userId}).then(user => {
          user.status = false;
          user.save();
          changeUserStatus('offline', user, socket);
        }).catch(err => console.log(err));
      }
      delete users[socket.id]
    });
  })
}

function changeUserStatus(action, user, socket) {
  console.log(action)
  for (let room of user.rooms) {
    console.log(room)
    socket.broadcast.to(room).emit(action, user._id);
  }
}

Socket.connection = connection;
module.exports = Socket;
