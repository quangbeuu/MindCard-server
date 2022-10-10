// Khai báo máy chủ socket.io

const registerSocketServer = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      // Đưởng dẫn để React có thể kết nối dc vs Socket.io phía server
      origin: "http://localhost:3001",
      methods: ["GET", "POST"],
    },
  });
  // Nơi để lắng nghe hoặc phát ra các event gửi tới frontend

  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
  });
};

module.exports = {
  registerSocketServer,
};
