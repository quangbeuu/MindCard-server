const Message = require("../models/messageModel");
const Conversation = require("../models/conversationsModel");
const chatUpdates = require("./updates/updateChat");

const directMessageHandler = async (socket, data) => {
  try {
    const { _id: userId } = socket.handshake.auth.user;
    console.log("id ne", userId);
    const { receiverUserId, content } = data;
    //1. Tạo message mớis
    const message = await Message.create({
      content: content,
      author: userId,
      data: new Date(),
      type: "DIRECT",
    });
    // 2. Kiểm tra xem đã tồn tại conversations nào giữa hai ng dùng chưa
    // (nếu không tạo conversations mới)
    const conversation = await Conversation.findOne({
      participants: { $all: [userId, receiverUserId] },
    });
    if (conversation) {
      conversation.messages.push(message._id);
      await conversation.save();
      // Hiển thị và update tin nhắn tới ng gửi và ng nhận nếu họ onl
      chatUpdates.updateChatHistory(conversation._id.toString());
    } else {
      // Tạo 1 conversations nếu nó ko exists
      const newConversation = await Conversation.create({
        messages: [message._id],
        participants: [userId, receiverUserId],
      });
      // Hiển thị và update tin nhắn tới ng gửi và ng nhận nếu họ onl
      chatUpdates.updateChatHistory(conversation._id.toString());
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = directMessageHandler;
