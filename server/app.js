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
const excludedRoute = ['/login', '/registration']
const Socket = require('./socket');

mongoose.connect("mongodb://localhost:27017/chat") // connect with local db, replace later

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(helpers.unless(excludedRoute, authToken));
app.use(router);

Socket.connection(io);

http.listen(3000, () => {
  console.log('server is running at port 3000');
})
