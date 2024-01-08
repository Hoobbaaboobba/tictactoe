const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", async (socket) => {
  socket.on("enter", (data) => {
    io.emit("enter", data);
  });
  socket.on("message", (data) => {
    io.emit("message", data);
  });
});

httpServer.listen(3001, () => {
  console.log("Server is listening to the port 3001");
});
