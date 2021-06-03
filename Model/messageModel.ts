import mongoose from "mongoose";
import moment from "moment";
const Message = new mongoose.Schema({
  content: {
    type: String,
  },
  time: {
    type: String,
    default: () => moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
  },
  sentBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

const MessageModel = mongoose.model("Message", Message);

export { MessageModel };
