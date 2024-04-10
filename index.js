const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const { Server } = require("socket.io");

const corsOptions = {
  origin: "https://active-chat-client-murex.vercel.app",
  methods: ["GET", "POST"],
};
app.use(cors(corsOptions));

const io = new Server(server, {
  cors: {
    origin: "https://active-chat-client-murex.vercel.app",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`New user connected ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("One user disconnected");
  });
});

server.listen(3001, () => {
  console.log("Seerver is runnning");
});
