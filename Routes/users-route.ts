import express from "express";
import { login, signup, isAuthorize, otpAuth, uploadPost, getAll} from '../Controller/users-controller'
import { verifyEmail, verifyPhone } from '../Controller/verificationController'
const router = express.Router();

//Route for getting all the users
router.post('/users-signup', uploadPost, signup)
router.get('/users', getAll)
router.post("/users-login-email", login, verifyEmail)
router.post("/users-login-phone", login, verifyPhone)
router.get("/users-verify", isAuthorize, otpAuth);


export default router;
