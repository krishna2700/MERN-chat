const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const http = require("http");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const socketio = require("socket.io");
const socketIo = require("./socket");
const groupRouter = require("./routes/groupRoutes");

dotenv.config();
const app = express();
const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: ["http://localhost:3690/"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});
// middlewares
app.use(cors());
app.use(express.json());

// connect to db
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

//   Intialisze
socketIo(io);

// routes
app.use("/api/users", userRouter);
app.use("/api/users", groupRouter);

// start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
