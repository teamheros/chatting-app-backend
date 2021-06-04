import { ChatModel } from "../Model/chatModel";
import { MessageModel } from "../Model/messageModel";

const getChats = async (req: any, res: any) => {
  let { users } = req.params;
  users = JSON.parse(users);
  console.log("users" , users)

  let chat = await ChatModel.findOne({
    users: users,
  }).populate("messages");

  res.status(200).send(chat);
};

const addChat = async (req: any, res: any) => {
  console.log(req.body)
  try {
    let { users, msg, sentBy } = req.body;

    let msgResponse = await MessageModel.create({ content: msg, sentBy });

    let doc = await ChatModel.findOneAndUpdate(
      { users: users },
      { $push: { messages: msgResponse._id } },
      { new: true, upsert: true }
    );
    res.status(201).send(doc);
  } catch (err: any) {
    console.log(err);
  }
};

export { getChats, addChat };
