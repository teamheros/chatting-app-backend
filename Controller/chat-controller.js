"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserChats = exports.addChat = exports.getChats = void 0;
var chatModel_1 = require("../Model/chatModel");
var messageModel_1 = require("../Model/messageModel");
var users_schema_1 = __importDefault(require("../Model/users-schema"));
var getChats = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, chat;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                users = req.params.users;
                return [4 /*yield*/, chatModel_1.ChatModel.findOne({
                        users: users,
                    }).populate('messages')];
            case 1:
                chat = _a.sent();
                res.status(200).send(chat);
                return [2 /*return*/];
        }
    });
}); };
exports.getChats = getChats;
var getUserChats = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, chat;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('currently Logged In User ', req.user);
                users = req.user[0]._id;
                console.log('User  ID ', users);
                return [4 /*yield*/, users_schema_1.default.findOne({ _id: users }).populate('chatDetails')];
            case 1:
                chat = _a.sent();
                console.log('User Chat ', chat);
                res.status(200).send(chat);
                return [2 /*return*/];
        }
    });
}); };
exports.getUserChats = getUserChats;
var addChat = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, users, msg, sentBy, msgResponse, doc, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                _a = req.body, users = _a.users, msg = _a.msg, sentBy = _a.sentBy;
                return [4 /*yield*/, messageModel_1.MessageModel.create({ content: msg, sentBy: sentBy })];
            case 1:
                msgResponse = _b.sent();
                return [4 /*yield*/, users_schema_1.default.findOneAndUpdate({ _id: sentBy }, { $addToSet: { chatDetails: users } }, { new: true, upsert: true })];
            case 2:
                _b.sent();
                return [4 /*yield*/, users_schema_1.default.findOneAndUpdate({ _id: users }, { $addToSet: { chatDetails: sentBy } }, { new: true, upsert: true })];
            case 3:
                _b.sent();
                return [4 /*yield*/, chatModel_1.ChatModel.findOneAndUpdate({ users: users }, { $push: { messages: msgResponse._id } }, { new: true, upsert: true })];
            case 4:
                doc = _b.sent();
                res.status(201).send(doc);
                return [3 /*break*/, 6];
            case 5:
                err_1 = _b.sent();
                console.log(err_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.addChat = addChat;
