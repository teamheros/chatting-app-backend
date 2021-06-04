import express from "express";
import { addChat, getChats } from "../Controller/chat-controller";

const chatRouter = express.Router();

chatRouter.get("/:users", getChats);

chatRouter.post("/", addChat);

export default chatRouter;
