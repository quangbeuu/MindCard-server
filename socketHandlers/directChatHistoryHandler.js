const Conversation = require("../models/conversationsModel");
const chatUpdate = require("./updates/updateChat");

const directChatHistoryHandler = async (socket, data) => {
  try {
    const { _id: userId } = socket.handshake.auth.user;
    const { receiverId } = data;

    const conversation = await Conversation.findOne({
      participants: { $all: [userId, receiverId] },
      type: "DIRECT",
    });

    // console.log("chat", conversation);

    if (conversation) {
      chatUpdate.updateChatHistory(conversation._id.toString(), socket.id);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = directChatHistoryHandler;
