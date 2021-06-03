"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRouter = void 0;
var express_1 = __importDefault(require("express"));
var chat_controller_1 = require("../Controller/chat-controller");
var chatRouter = express_1.default.Router();
exports.chatRouter = chatRouter;
chatRouter.get("/:users", chat_controller_1.getChats);
chatRouter.post("/", chat_controller_1.addChat);
