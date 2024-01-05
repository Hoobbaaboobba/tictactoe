const io = require("socket.io")(3000, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});

io.on("connection", async (socket) => {
  socket.on("message", (data) => {
    io.emit("message", data);
  });
});
