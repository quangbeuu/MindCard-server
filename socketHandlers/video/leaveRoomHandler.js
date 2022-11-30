const severStore = require("../../severStore");
const updateVideo = require("../updates/updateVideo");

const leaveRoomHandler = (socket, data) => {
  const { roomId } = data;

  console.log(roomId);
  const activeRoom = severStore.getActiveRoom(roomId);

  if (activeRoom) {
    severStore.leaveActiveRoom(roomId, socket.id);
    updateVideo.updateRooms();
  }
};

module.exports = leaveRoomHandler;
