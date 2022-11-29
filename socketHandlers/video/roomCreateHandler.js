const severStore = require("../../severStore");

const roomCreateHandler = (socket) => {
  const socketId = socket.id;

  const userId = socket.handshake.auth.user._id;

  const roomDetails = severStore.addNewActiveRoom(userId, socketId);

  //

  socket.emit("room-create", {
    roomDetails,
  });
};

module.exports = roomCreateHandler;
