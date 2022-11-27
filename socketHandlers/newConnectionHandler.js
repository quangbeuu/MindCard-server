const serverStore = require("../severStore");
const friendUpdate = require("../socketHandlers/updates/updateFriend");

const newConnectionHandler = async (socket, io) => {
  const userDetails = socket.handshake.auth?.user;
  serverStore.addNewConnectedUser({
    // socket.id: id của lượt kết nốt của ng dùng
    socketId: socket.id,
    userId: userDetails.id,
  });

  // 1. Để khi reset lời mời ko mất thì ta mỗi lần kết nối ta
  // phải update danh sách Invitation
  friendUpdate.updateFriendPendingInvitations(userDetails.id);

  // 2. Update friends list
  friendUpdate.updateFriends(userDetails.id);
};

module.exports = newConnectionHandler;
