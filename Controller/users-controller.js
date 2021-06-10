"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.userSignUp = exports.uploadPhotos = exports.getByUserName = exports.getAll = exports.otpAuth = exports.isAuthorize = exports.login = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var users_schema_1 = __importDefault(require("../Model/users-schema"));
var dotenv_1 = __importDefault(require("dotenv"));
var otpSchema_1 = __importDefault(require("../Model/otpSchema"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var path_1 = __importDefault(require("path"));
var multer_1 = __importDefault(require("multer"));
dotenv_1.default.config();
var POSTS_PATH = path_1.default.join('/uploads');
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
var upload = multer_1.default({
    storage: storage
    //  fileFilter: multerFilter
});
var uploadPhotos = upload.single('profileImage');
exports.uploadPhotos = uploadPhotos;
// const fileUpload: any = async (req: any, res: any) => {
//   console.log('Req.body ', req.body);
//   const form = new formidable.IncomingForm();
//   form.parse(req, function (err: any, fields: any, files: any) {
//     var oldPath = files.profileImage.path;
//     var rawData = fs.readFileSync(oldPath);
//     fs.writeFile(newPath, rawData, function (err) {
//       if (err) console.log(err);
//       return res.send('Successfully uploaded');
//     });
//     // next();
//   });
// };
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
var getByUserName = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userName, newUser, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userName = req.params.userName;
                return [4 /*yield*/, users_schema_1.default.find({ userName: userName })];
            case 1:
                newUser = _a.sent();
                res.json({ users: newUser });
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(400).json({
                    status: 'fail',
                    message: err_2,
                });
                console.log(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getByUserName = getByUserName;
// const POSTS_PATH = path.join('/uploads/');
// const signup = async (req: any, res: any, file: any) => {
//   try {
//     console.log( req.body);
//     // const imagePath = req.body.profileImage;
//     // console.log('imagePath  ', imagePath);
//     // var newPath = path.join(__dirname, '..', POSTS_PATH + Date.now() + '.jpg');
//     // var rawData = fs.readFileSync(imagePath);
//     // console.log('New Path', newPath);
//     // console.log('Raw Data', rawData);
//     // fs.writeFile(newPath, rawData, function (err) {
//     //   if (err) console.log(err);
//     // });
//     // const newUser = await User.create({ ...req.body, profileImage: newPath });
//     // const newUser = await User.create({ ...req.body, profileImage: newPath });
//     const newUser = await User.create({ ...req.body, profileImage: POSTS_PATH + '/' + req.file.filename });
//     res.json({ users: newUser });
//     // @ts-ignore
//   } catch (err) {
//     res.status(400).json({
//       status: 'fail',
//       message: err,
//     });
//     console.log(err);
//   }
// };
var userSignUp = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newUser, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, users_schema_1.default.create(__assign(__assign({}, req.body), { profileImage: POSTS_PATH + '/' + req.file.filename }))];
            case 1:
                newUser = _a.sent();
                res.json({ users: newUser });
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                res.status(400).json({
                    status: 'fail',
                    message: err_3,
                });
                console.log(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.userSignUp = userSignUp;
var login = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, password, user, userMessage, _b, token, err_4;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 5, , 6]);
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
                return [4 /*yield*/, users_schema_1.default.findOne({ $or: [{ email: userId }, { phoneNumber: userId }] }).populate('chatDetails')];
            case 2:
                userMessage = _c.sent();
                console.log('user --->  ', userMessage);
                _b = !user;
                if (_b) return [3 /*break*/, 4];
                return [4 /*yield*/, user.correctPassword(password, user.password)];
            case 3:
                _b = !(_c.sent());
                _c.label = 4;
            case 4:
                // @ts-ignore
                if (_b) {
                    res.send(400).json({
                        message: 'UnSuccessFul',
                    });
                }
                else {
                    token = jsonwebtoken_1.default.sign({ authorization: user.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
                    res.json({
                        users: userMessage,
                        message: 'Login SuccessFul',
                        token: token,
                        //   otp:otp1
                    });
                    req.user = user; //req.user ---> Manjunath or Gaurav
                    next();
                }
                return [3 /*break*/, 6];
            case 5:
                err_4 = _c.sent();
                console.log(err_4);
                res.json({
                    message: 'UnSuccessFul',
                });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
// const includes = async (req: any, res: any, next: any) => {
//   if (req.body.userId.indexOf('@gmail.com') > 0) {
//   }
// };
var isAuthorize = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var token, decode, requestUser, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                console.log('header   ', req.headers);
                if (!(req.headers && req.headers.authorization)) return [3 /*break*/, 2];
                token = req.headers.authorization.split(' ')[1];
                console.log('Token', token);
                decode = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
                console.log('Decode', decode);
                return [4 /*yield*/, users_schema_1.default.find({ email: decode.authorization })];
            case 1:
                requestUser = _a.sent();
                console.log('requestdUser', requestUser);
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
                err_5 = _a.sent();
                console.log(err_5);
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
    var otp, user, userCheck, err_6;
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
                err_6 = _a.sent();
                res.status(400).send('Bad Request');
                console.log(err_6);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.otpAuth = otpAuth;
// export { login, isAuthorize, otpAuth, uploadPhotos, userSignUp };
// const POSTS_PATH = path.join('/uploads/images'); //1
// let storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, '..', POSTS_PATH));
//   },
//   filename: function (req, file, cb) {
//     const extention = file.mimetype.split('/')[1];
//     console.log('Extension', extention);
//     cb(null, file.fieldname + '-' + Date.now() + `.${extention}`);
//   },
// });
// const upload = multer({
//    storage: multerStorage
//   //  fileFilter: multerFilter
// })
// const uploadPhotos = upload.single('photo')
//is defined as statics so that the methods or properties can be accesible without creating an instance
//single function to just take the one file as input
// const uploadPost = multer({ storage: storage }).single('profileImage');
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
