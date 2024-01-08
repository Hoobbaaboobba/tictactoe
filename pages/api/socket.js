import { Server } from "socket.io";

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", async (socket) => {
      socket.on("enter", (data) => {
        io.emit("enter", data);
      });
      socket.on("message", (data) => {
        io.emit("message", data);
      });
    });
  }

  res.end();
};

export default SocketHandler;
