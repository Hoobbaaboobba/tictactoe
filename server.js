const io = require("socket.io")(3001, {
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
