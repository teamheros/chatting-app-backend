import jwt from 'jsonwebtoken';
import User from '../Model/users-schema';
import dotenv from 'dotenv';
import Otp from '../Model/otpSchema';
import { verifyEmail, verifyPhone } from './verificationController';
import bcrypt from 'bcryptjs';
import twilio, { Twilio } from 'twilio';
import multer from 'multer';
import path from 'path';
import { Router } from 'express';
import express from 'express';
// const router = express.Router();
dotenv.config();

const POSTS_PATH = path.join('/uploads/images'); //1

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', POSTS_PATH));
  },
  filename: function (req, file, cb) {
    const extention = file.mimetype.split('/')[1];
    console.log('Extension', extention);
    cb(null, file.fieldname + '-' + Date.now() + `.${extention}`);
  },
});

//is defined as statics so that the methods or properties can be accesible without creating an instance
//single function to just take the one file as input
const uploadPost = multer({ storage: storage }).single('profileImage');

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

const getAll = async (req: any, res: any) => {
  try {
    const newUser = await User.find({});
    res.json({ users: newUser });

    // @ts-ignore
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
    console.log(err);
  }
};

const signup = async (req: any, res: any) => {
  try {
    const val = req.body;
    console.log('File NAme ---- > ', req.body);
    // console.log('File NAme ---- > ', req.file);

    // res.status(200).json({
    //       status: 'SuccessFul',
    //     });

    const newUser = await User.create({ ...req.body, profileImage: POSTS_PATH + '/' + req.file.name });
    res.json({ users: newUser });
    res.status(200).json({
      status: 'SuccessFul',
    });
    // @ts-ignore
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
    console.log(err);
  }
};

const login = async (req: any, res: any, next: any) => {
  try {
    const { userId, password } = req.body;
    console.log('userId : ', userId);

    if (!userId || !password) {
      // @ts-ignore
      res.status(400).json({
        status: 'The fields are empty please enter the data',
      });
    }
    const user: any = await User.findOne({ $or: [{ email: userId }, { phoneNumber: userId }] });
    console.log('user  ', user);

    // @ts-ignore
    if (!user || !(await user.correctPassword(password, user.password))) {
      res.send(400).json({
        message: 'UnSuccessFul',
      });
    } else {
      // //@ts-ignore
      let token = jwt.sign({ authorization: user.email }, process.env.SECRET_KEY!, { expiresIn: '1h' });
      res.json({
        // users: newOtp,
        message: 'Login SuccessFul',
        token: token,
        //   otp:otp1
      });
      req.user = user; //req.user ---> Manjunath or Gaurav
      next();
    }
  } catch (err) {
    console.log(err);

    res.json({
      message: 'UnSuccessFul',
    });
  }
};

// const includes = async (req: any, res: any, next: any) => {
//   if (req.body.userId.indexOf('@gmail.com') > 0) {
//   }
// };

const isAuthorize = async (req: any, res: any, next: any) => {
  try {
    console.log(req.headers);
    if (req.headers && req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      console.log('Token', token);
      const decode = jwt.verify(token, process.env.SECRET_KEY!);
      console.log('Decode', decode);
      // @ts-ignore
      const requestUser = await User.findOne(decode.email);
      console.log('User', requestUser);

      try {
        if (!requestUser) {
          return res.json({ success: false, message: 'Unauthorized Access' });
        } else {
          req.user = requestUser;
          next();
        }
      } catch (err) {
        if (err.name === 'JsonWebTokenError') {
          return res.json({ success: false, message: 'Unauthorized Access' });
        }
        if (err.name === 'TokenExpiredError') {
          return res.json({ success: false, message: 'Session Expire please try sign again' });
        }
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: 'Error in Authorization',
    });
  }
};

const otpAuth = async (req: any, res: any) => {
  try {
    const { otp } = req.body;
    console.log('TP   ', otp);
    const user = req.user._id;
    const userCheck: any = await Otp.findOne({ user });
    console.log('userCheck   ', userCheck);

    if (userCheck) {
      // if(userCheck.otp === otp)
      if (await bcrypt.compare(otp, userCheck.otp)) {
        res.json({ success: true, message: 'Successful Access' });
      }
    } else {
      res.json({
        message: 'Un-Successful',
      });
    }
  } catch (err) {
    res.status(400).send('Bad Request');
    console.log(err);
  }
};

export { login, signup, isAuthorize, otpAuth, uploadPost, getAll };
