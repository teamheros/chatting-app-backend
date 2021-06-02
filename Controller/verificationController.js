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
exports.verifyPhone = exports.verifyEmail = void 0;
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var Auth = require('two-step-auth').Auth;
var otpSchema_1 = __importDefault(require("../Model/otpSchema"));
var twilio_1 = require("twilio");
var verifyEmail = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, user, val, response, salt, hashedOtp, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('-----------------------------------------------');
                email = req.body.userId;
                console.log('CurrentUser : ', req.user);
                console.log('User-EmailId : ', email);
                console.log('User_ID', req.user._id);
                return [4 /*yield*/, otpSchema_1.default.findOne({ user: req.user._id })];
            case 1:
                user = _a.sent();
                console.log('Finding User OTP ', user);
                if (!user) return [3 /*break*/, 3];
                return [4 /*yield*/, otpSchema_1.default.findByIdAndDelete(user)];
            case 2:
                val = _a.sent();
                console.log('DELETED VALUE ', val);
                _a.label = 3;
            case 3:
                _a.trys.push([3, 9, , 10]);
                return [4 /*yield*/, Auth(req.user.email, 'Books Web Store')];
            case 4:
                response = _a.sent();
                if (!(response.status === 200)) return [3 /*break*/, 8];
                return [4 /*yield*/, bcryptjs_1.default.genSalt()];
            case 5:
                salt = _a.sent();
                return [4 /*yield*/, bcryptjs_1.default.hash(String(response.OTP), salt)];
            case 6:
                hashedOtp = _a.sent();
                return [4 /*yield*/, otpSchema_1.default.create({
                        otp: hashedOtp,
                        user: req.user._id,
                    })];
            case 7:
                _a.sent();
                res.status(200).json({ status: true, message: "Login SuccessFul Otp has been sent to " + email });
                res.json({
                // users: newOtp,
                //   otp:otp1
                });
                _a.label = 8;
            case 8: return [3 /*break*/, 10];
            case 9:
                err_1 = _a.sent();
                res.status(404).json({ status: false, message: err_1.message });
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.verifyEmail = verifyEmail;
var verifyPhone = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var phone, user, client, otp_1, salt, hashedOtp, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                phone = req.body.userId;
                console.log('--------********************----', phone);
                return [4 /*yield*/, otpSchema_1.default.findOne({ user: req.user._id })];
            case 1:
                user = _a.sent();
                console.log('---USER--', user);
                if (!user) return [3 /*break*/, 3];
                return [4 /*yield*/, otpSchema_1.default.deleteOne(user)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                _a.trys.push([3, 8, , 9]);
                console.log('---------------------111------------------------');
                client = new twilio_1.Twilio(process.env.TWILIO_AUTH_SID, process.env.TWILIO_AUTH_TOKEN);
                console.log('log  ', client);
                console.log('-----------------------222---------------------');
                otp_1 = Math.floor(Math.random() * 899999 + 100000);
                return [4 /*yield*/, client.messages.create({
                        body: "Your otp for Books Web Store is : " + otp_1,
                        to: phone,
                        from: process.env.TWILIO_NUMBER,
                    })];
            case 4:
                _a.sent();
                return [4 /*yield*/, bcryptjs_1.default.genSalt()];
            case 5:
                salt = _a.sent();
                return [4 /*yield*/, bcryptjs_1.default.hash(String(otp_1), salt)];
            case 6:
                hashedOtp = _a.sent();
                return [4 /*yield*/, otpSchema_1.default.create({
                        user: req.user._id,
                        otp: hashedOtp,
                    }).then(function (res) { return console.log('Working Properly ', res, 'OTP  ', otp_1); })];
            case 7:
                _a.sent();
                res.status(200).json({ status: true, message: "Otp has been sent to " + phone });
                return [3 /*break*/, 9];
            case 8:
                err_2 = _a.sent();
                res.send(err_2);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.verifyPhone = verifyPhone;
