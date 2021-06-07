import express from "express";
import { login, signup, isAuthorize, otpAuth, getAll,getByUserName,uploadPhotos} from '../Controller/users-controller'
import { verifyEmail, verifyPhone } from '../Controller/verificationController'
const router = express.Router();

//Route for getting all the users
router.post('/users-signup',uploadPhotos,signup)
router.get('/users', getAll)
router.get('/users/:userName', getByUserName)
// router.post("/users-login-email", login, verifyEmail)
router.post("/users-login", login, verifyEmail, verifyPhone)
router.post("/users-verify", isAuthorize, otpAuth);


export default router;
