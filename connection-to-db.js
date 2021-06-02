"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var connectionToDB = function () {
    return mongoose_1.default.connect("mongodb+srv://" + process.env.DATABASE_USER + ":" + process.env.DATABASE_PASSWORD + "@" + process.env.DATABASE_CLUSTER + "/" + process.env.DATABASE_NAME + "?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
    });
};
exports.default = connectionToDB;
