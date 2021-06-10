import { ChatModel } from '../Model/chatModel';
import { MessageModel } from '../Model/messageModel';
import userModal from '../Model/users-schema';



const getChats = async (req: any, res: any) => {
  let { users } = req.params;

  let chat:any = await ChatModel.findOne({
    users: users,
  }).populate('messages');

  res.status(200).send(chat);
};

const getUserChats = async (req: any, res: any) => {
  console.log('currently Logged In User ', req.user)
  
  let  users  = req.user[0]._id;
  console.log('User  ID ', users);

  const chat: any = await userModal.findOne({ _id : users }).populate('chatDetails');
  console.log('User Chat ', chat);

  res.status(200).send(chat);
};

const addChat = async (req: any, res: any) => {
  try {
    let { users, msg, sentBy } = req.body;
    let msgResponse = await MessageModel.create({ content: msg, sentBy });
    await userModal.findOneAndUpdate({ _id: sentBy },{ $addToSet: { chatDetails: users } },
    { new: true, upsert: true }
    );
    await userModal.findOneAndUpdate({ _id: users },{ $addToSet: { chatDetails: sentBy } },
      { new: true, upsert: true }
    );
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

export { getChats, addChat, getUserChats };
