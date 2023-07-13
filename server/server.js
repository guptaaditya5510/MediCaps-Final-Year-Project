// const express = require("express");
// const app = express();
// const http = require("http").createServer(app);
// const io = require("socket.io")(http,{
//     cors: {
//         origin: '*',
//       }
// });
// const PORT = 8000;

// // Data for demo purposes only
// const users = [
//   { id: "user1", name: "Alice" },
//   { id: "user2", name: "Bob" },
//   { id: "user3", name: "Charlie" },
// ];

// // When a client connects to the server
// io.on("connection", (socket) => {
//   console.log("User connected");

//   // When the client joins a chat room
//   socket.on("joinRoom", ({ roomId }) => {
//     console.log(`User joined room ${roomId}`);
//     socket.join(roomId);
//   });

//   // When the client leaves a chat room
//   socket.on("leaveRoom", ({ roomId }) => {
//     console.log(`User left room ${roomId}`);
//     socket.leave(roomId);
//   });

//   // When the client sends a message
//   socket.on("sendMessage", ({ room, sender, recipient, message, timestamp }) => {
//     console.log(`User sent message: ${message}`);

//     // Emit the message to all users in the room
//     io.to(room).emit("messageReceived", { sender, recipient, message, timestamp });
//   });

//   // When the client disconnects from the server
//   socket.on("disconnect", () => {
//     console.log("User disconnected");
//   });
// });

// // Start the server
// http.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });


const express = require('express');
const http = require('http');
const path = require("path");
const socketIo = require('socket.io');
const cors = require("cors");
const mongoose = require("mongoose");
const userModel=require("./models/signup");
const jwt = require("jsonwebtoken");

const app = express();
const server = http.createServer(app);
const io = socketIo(server,{
  cors:{
    origin:"*"
  }
});

app.use(cors());
app.use(express.json());

mongoose.connect(
  `mongodb+srv://astha:astha7788@cluster0.fzzcoie.mongodb.net/?retryWrites=true&w=majority`,
  {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  }
)

// const sockets = new Map();

const db = mongoose.connection;
db.on("error", console.error.bind(console,"console err: "));
db.once("open", () => {
  console.log("connected sucessfully");
})

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', (message) => {
    console.log('message:', message);
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.use("/", require("./router/auth"));
app.use("/", require("./router/addChat"));
app.use("/", require("./router/user"));

server.listen(3001, () => {
  console.log('listening on *:3001');
});
