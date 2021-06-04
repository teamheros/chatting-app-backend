"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var moment_1 = __importDefault(require("moment"));
var otpSchema = new mongoose_1.default.Schema({
    expire_at: { type: Date, default: Date.now, expires: 36000 },
    otp: {
        type: String,
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User'
    },
    timestamp: {
        type: String,
        default: function () { return moment_1.default().format("dddd, MMMM Do YYYY, h:mm:ss a"); }
    }
});
var Otp = mongoose_1.default.model('Otp', otpSchema);
exports.default = Otp;
