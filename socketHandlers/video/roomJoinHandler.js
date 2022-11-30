const severStore = require("../../severStore");
const updateVideo = require("../updates/updateVideo");

const roomJoinHandler = (socket, data) => {
  const { roomId } = data;

  const participantDetails = {
    userId: socket.handshake.auth.user._id,
    socketId: socket.id,
  };

  const roomDetails = severStore.getActiveRoom(roomId);
  severStore.joinActiveRoom(roomId, participantDetails);
  updateVideo.updateRooms();
};

module.exports = roomJoinHandler;
