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
exports.getAll = exports.uploadPost = exports.otpAuth = exports.isAuthorize = exports.signup = exports.login = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var users_schema_1 = __importDefault(require("../Model/users-schema"));
var dotenv_1 = __importDefault(require("dotenv"));
var otpSchema_1 = __importDefault(require("../Model/otpSchema"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
dotenv_1.default.config();
var POSTS_PATH = path_1.default.join('/uploads/images'); //1
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.join(__dirname, '..', POSTS_PATH));
    },
    filename: function (req, file, cb) {
        var extention = file.mimetype.split('/')[1];
        console.log('Extension', extention);
        cb(null, file.fieldname + '-' + Date.now() + ("." + extention));
    },
});
//is defined as statics so that the methods or properties can be accesible without creating an instance
//single function to just take the one file as input
var uploadPost = multer_1.default({ storage: storage }).single('profileImage');
exports.uploadPost = uploadPost;
// const multerStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     //dirname(model folder) will be the current folder we are in so we need to go to parent directory (..)second argument to go to the uploads folder
//     //error first callback
//     cb(null, path.join(__dirname, "..", POSTS_PATH));
//   },
//   filename: (req:any, file:any, cb:any) => {
//     const ext = file.mimetype.split('/')[1]
//     cb(null, `user-${Date.now()}.${ext}`)
//     }
// });
// const multerFilter = (req:any, file:any, cb:any) => {
//   if(file.mimetyp.startsWith('image'))
//   {
//     cb(null, true);
//   }else {
//     cb('Not an image! Please upload only images.')
//   }
// };
// const upload = multer({
//    storage: multerStorage
//   //  fileFilter: multerFilter
// })
// const uploadPhotos = upload.single('photo')
var getAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newUser, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, users_schema_1.default.find({})];
            case 1:
                newUser = _a.sent();
                res.json({ users: newUser });
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(400).json({
                    status: 'fail',
                    message: err_1,
                });
                console.log(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAll = getAll;
var signup = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // try {
        // console.log('File NAme ---- > ', req.body);
        console.log('File NAme ---- > ', req.file);
        res.status(200).json({
            status: 'SuccessFul',
        });
        return [2 /*return*/];
    });
}); };
exports.signup = signup;
var login = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, password, user, _b, token, err_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 4, , 5]);
                _a = req.body, userId = _a.userId, password = _a.password;
                console.log('userId : ', userId);
                if (!userId || !password) {
                    // @ts-ignore
                    res.status(400).json({
                        status: 'The fields are empty please enter the data',
                    });
                }
                return [4 /*yield*/, users_schema_1.default.findOne({ $or: [{ email: userId }, { phoneNumber: userId }] })];
            case 1:
                user = _c.sent();
                console.log('user  ', user);
                _b = !user;
                if (_b) return [3 /*break*/, 3];
                return [4 /*yield*/, user.correctPassword(password, user.password)];
            case 2:
                _b = !(_c.sent());
                _c.label = 3;
            case 3:
                // @ts-ignore
                if (_b) {
                    // @ts-ignore
                    // res.status(400).json({
                    //   status: 'No Users',
                    // });
                    res.send(400).json({
                        message: 'UnSuccessFul',
                    });
                }
                else {
                    token = jsonwebtoken_1.default.sign({ authorization: user.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
                    res.json({
                        // users: newOtp,
                        message: 'Login SuccessFul',
                        token: token,
                        //   otp:otp1
                    });
                    req.user = user;
                    next();
                }
                return [3 /*break*/, 5];
            case 4:
                err_2 = _c.sent();
                console.log(err_2);
                res.json({
                    message: 'UnSuccessFul',
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
var isAuthorize = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var token, decode, requestUser, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                console.log(req.headers);
                if (!(req.headers && req.headers.authorization)) return [3 /*break*/, 2];
                token = req.headers.authorization.split(' ')[1];
                console.log('Token', token);
                decode = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
                console.log('Decode', decode);
                return [4 /*yield*/, users_schema_1.default.findOne(decode.email)];
            case 1:
                requestUser = _a.sent();
                console.log('User', requestUser);
                try {
                    if (!requestUser) {
                        return [2 /*return*/, res.json({ success: false, message: 'Unauthorized Access' })];
                    }
                    else {
                        req.user = requestUser;
                        next();
                    }
                }
                catch (err) {
                    if (err.name === 'JsonWebTokenError') {
                        return [2 /*return*/, res.json({ success: false, message: 'Unauthorized Access' })];
                    }
                    if (err.name === 'TokenExpiredError') {
                        return [2 /*return*/, res.json({ success: false, message: 'Session Expire please try sign again' })];
                    }
                }
                _a.label = 2;
            case 2: return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                console.log(err_3);
                res.status(400).json({
                    message: 'Error in Authorization',
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.isAuthorize = isAuthorize;
var otpAuth = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var otp, user, userCheck, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                otp = req.body.otp;
                console.log('TP   ', otp);
                user = req.user._id;
                return [4 /*yield*/, otpSchema_1.default.findOne({ user: user })];
            case 1:
                userCheck = _a.sent();
                console.log('userCheck   ', userCheck);
                if (!userCheck) return [3 /*break*/, 3];
                return [4 /*yield*/, bcryptjs_1.default.compare(otp, userCheck.otp)];
            case 2:
                // if(userCheck.otp === otp)
                if (_a.sent()) {
                    res.json({ success: true, message: 'Successful Access' });
                }
                return [3 /*break*/, 4];
            case 3:
                res.json({
                    message: 'Un-Successful',
                });
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                err_4 = _a.sent();
                res.status(400).send('Bad Request');
                console.log(err_4);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.otpAuth = otpAuth;
