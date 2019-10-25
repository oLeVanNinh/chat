require('dotenv').config()

const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const router = require("./controllers/router");
const logger = require("morgan");
const cors = require("cors");
const helpers = require("./helpers/helper");
const authToken = require("./middleware/auth.middleware");

mongoose.connect("mongodb://localhost:27017/chat") // connect with local db, replace later

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(helpers.unless('/gen_token', authToken));
app.use(router);

io.on('connection', (socket) => {
  socket.on('join', (roomId) => {
    socket.join(roomId);
  })

  socket.on('leave', (roomId) => {
    socket.leave(roomId);
  })

  socket.on('message', (data) => {
    io.sockets.in(data.roomId).emit('chat message', data.message);
  })
})

http.listen(3000, () => {
  console.log('server is running at port 3000');
})
