"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var users_controller_1 = require("../Controller/users-controller");
var verificationController_1 = require("../Controller/verificationController");
var router = express_1.default.Router();
//Route for getting all the users
router.post('/users-signup', users_controller_1.uploadPhotos, users_controller_1.signup);
router.get('/users', users_controller_1.getAll);
router.get('/users/:userName', users_controller_1.getByUserName);
// router.post("/users-login-email", login, verifyEmail)
router.post("/users-login", users_controller_1.login, verificationController_1.verifyEmail, verificationController_1.verifyPhone);
router.post("/users-verify", users_controller_1.isAuthorize, users_controller_1.otpAuth);
exports.default = router;
