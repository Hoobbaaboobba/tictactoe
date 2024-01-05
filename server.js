const io = require("socket.io")(3000, {
  cors: {
    origin: process.env.NEXT_PUBLIC_APP_URL,
    methods: ["GET", "POST"],
  },
});

io.on("connection", async (socket) => {
  socket.on("message", (data) => {
    io.emit("message", data);
  });
});
