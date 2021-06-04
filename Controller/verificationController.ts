import bcrypt from 'bcryptjs';
let { Auth } = require('two-step-auth');
import OTP from '../Model/otpSchema';
import User from '../Model/users-schema';
import twilio, { Twilio } from 'twilio';

const verifyEmail = async (req: any, res: any, next: any) => {
  console.log('-----------------------------------------------');
  if (req.body.userId.indexOf('@gmail.com') < 0) {
  next();
  }
  const email = req.body.userId;
  console.log('CurrentUser : ', req.user);
  console.log('User-EmailId : ', email);
  console.log('User_ID', req.user._id);

  let user: any = await OTP.findOne({ user: req.user._id });  
  console.log('Finding User OTP ', user);

  if (user) {
    const val = await OTP.findByIdAndDelete(user);
    console.log('DELETED VALUE ', val);
  }

  try {
    const response = await Auth(req.user.email, 'Chatting App'); 
    if (response.status === 200) {
      let hashedOtp = await bcrypt.hash(String(response.OTP), 10);
      await OTP.create({
        otp: hashedOtp,
        user: req.user._id,
      });

      res.status(200).json({ status: true, message: `Login SuccessFul Otp has been sent to ${email}`});
      res.json({
        // users: newOtp,
        //   otp:otp1
      });
    }
  } catch (err) {
    res.status(404).json({ status: false, message: err.message });
  }
};

const verifyPhone = async (req: any, res: any) => {
  const phone = req.body.userId;
  console.log('--------********************----', phone);

  let user: any = await OTP.findOne({ user: req.user._id });
  console.log('---USER--', user);
  if (user) {
    await OTP.deleteOne(user);
  }
  try {
    console.log('---------------------111------------------------');
    const client = new Twilio(process.env.TWILIO_AUTH_SID!, process.env.TWILIO_AUTH_TOKEN!);
    console.log('log  ', client);
    console.log('-----------------------222---------------------');

    const otp = Math.ceil(Math.random() * 899999 + 100000);  
    await client.messages.create({
      body: `Your otp for Chatting App is : ${otp}`,
      to: phone,
      from: process.env.TWILIO_NUMBER,
    });

    let hashedOtp = await bcrypt.hash(String(otp), 10);

    await OTP.create({
      user: req.user._id,
      otp: hashedOtp,
    }).then((res) => console.log('Working Properly ', res, 'OTP  ', otp));

    res.status(200).json({ status: true, message: `Otp has been sent to ${phone}` });
  } catch (err) {
    res.send(err);
  }
};

export { verifyEmail, verifyPhone };
