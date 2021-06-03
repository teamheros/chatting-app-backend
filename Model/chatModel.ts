import mongoose from "mongoose";

const Chat = new mongoose.Schema({
  users: {
    type: [mongoose.Schema.Types.ObjectId],
    ref : "users",
    required: true,
  },
  messages: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Message",
  },
});

const ChatModel = mongoose.model("Chat", Chat);

export { ChatModel };
