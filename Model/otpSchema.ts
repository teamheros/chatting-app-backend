import mongoose from "mongoose";
import moment from 'moment'

const otpSchema = new mongoose.Schema({
  expire_at:{type:Date, default:Date.now, expires: 36000 },
  otp: {
    type: String,
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  timestamp: {
    type: String, 
    default: () => moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
}
});

const Otp = mongoose.model('Otp', otpSchema);
export default Otp ; 
