// Khai báo máy chủ socket.io

const disconnectHandler = require("./socketHandlers/disconnectHandler");
const newConnectionHandler = require("./socketHandlers/newConnectionHandler");
const createCardHandler = require("./socketHandlers/cards/createCardHandler");
const deleteCardHandler = require("./socketHandlers/cards/deleteCardHandler");
const serverStore = require("./severStore");
const getCardHandler = require("./socketHandlers/cards/getCardHandler");
const getStudiedCardHandler = require("./socketHandlers/cards/getStudiedCardHandler");
const getNotStudiedCardHandler = require("./socketHandlers/cards/getNotStudiedCardHandler");
const directMessageHandler = require("./socketHandlers/directMessageHandler");
const directChatHistoryHandler = require("./socketHandlers/directChatHistoryHandler");

const registerSocketServer = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      // Đưởng dẫn để React có thể kết nối dc vs Socket.io phía server
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  // Nơi để lắng nghe hoặc phát ra các event gửi tới frontend

  // Set giá trị cho đối tượng io để có thể sử dụng ở nhiều nơi
  serverStore.setSocketServerInstance(io);

  const emitOnlineUsers = () => {
    const onlineUsers = serverStore.getOnlineUsers();
    // console.log(onlineUsers);
    io.emit("online-users", { onlineUsers });
  };

  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
    // console.log(socket.handshake.auth?.user);

    // Thêm ng dùng vảo mảng những ng dùng đang online
    newConnectionHandler(socket, io);
    emitOnlineUsers();

    // Event join-set
    socket.on("join-set", (id) => {
      socket.join(id);
      // * Kiểm tra các phòng đang có
      // socket.rooms.forEach((room) => {
      //   console.log("room", room);
      // });
    });

    // Event creat-card dc gửi từ Client
    socket.on("create-card", (data) => {
      // console.log(data);
      createCardHandler(data, socket);
    });

    // Event delete-card dc gửi từ Client
    socket.on("delete-card", (data) => {
      deleteCardHandler(data, socket);
    });

    // Event get-card
    socket.on("get-card", (id) => {
      // console.log(id);
      getCardHandler(id, socket);
    });

    socket.on("get-studied", (id) => {
      getStudiedCardHandler(id, socket);
    });

    socket.on("get-not-studied", (id) => {
      getNotStudiedCardHandler(id, socket);
    });

    socket.on("direct-message", (data) => {
      // console.log("direct", data);
      directMessageHandler(socket, data);
    });

    socket.on("direct-chat-history", (data) => {
      // console.log("history", data);
      directChatHistoryHandler(socket, data);
    });

    // Khi ng dùng mất kết nối internet hoặc offline
    socket.on("disconnect", () => {
      disconnectHandler(socket);
    });
  });
  setInterval(() => {
    emitOnlineUsers();
  }, [8000]);
};

module.exports = {
  registerSocketServer,
};
