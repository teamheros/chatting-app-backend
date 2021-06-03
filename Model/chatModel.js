"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var Chat = new mongoose_1.default.Schema({
    users: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        ref: "users",
        required: true,
    },
    messages: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        ref: "Message",
    },
});
var ChatModel = mongoose_1.default.model("Chat", Chat);
exports.ChatModel = ChatModel;
