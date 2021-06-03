"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var moment_1 = __importDefault(require("moment"));
var Message = new mongoose_1.default.Schema({
    content: {
        type: String,
    },
    time: {
        type: String,
        default: function () { return moment_1.default().format("dddd, MMMM Do YYYY, h:mm:ss a"); },
    },
    sentBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "users",
    },
});
var MessageModel = mongoose_1.default.model("Message", Message);
exports.MessageModel = MessageModel;
