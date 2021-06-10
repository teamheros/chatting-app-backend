import express from 'express';
import { login, isAuthorize, otpAuth, getAll, getByUserName,  uploadPhotos, userSignUp } from '../Controller/users-controller';
import { verifyEmail, verifyPhone } from '../Controller/verificationController';
import { getUserChats } from '../Controller/chat-controller'
const router = express.Router();

//Route for getting all the users
router.post('/users-signup', uploadPhotos, userSignUp)
router.get('/users', getAll);
router.get('/users/:userName', getByUserName);
// router.post("/users-login-email", login, verifyEmail)
router.post('/users-login', login, verifyEmail, verifyPhone);
router.post('/users-verify', isAuthorize, otpAuth);
router.get('/users-list', isAuthorize, getUserChats);

export default router;
