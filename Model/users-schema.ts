import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UsersSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userName:{
    type: String,
    require: true,
    unique:true
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
  },
  profileImage: {
    type: String,
  },
  bioData: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
  },
  chatDetails: {
    type: [mongoose.Schema.Types.ObjectId],
    ref:"users",
    required: true,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (value: any): any {
        // @ts-ignore
        return value === this.password; //true
      },
    },
  },
});

UsersSchema.pre('save', async function (next) {
  // if (!this.isModified('password')) return next();
  // @ts-ignore
  this.password = await bcrypt.hash(this.password, 12);
  // @ts-ignore
  this.passwordConfirm = undefined;
  next();
});

UsersSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const userModel = mongoose.model('users', UsersSchema);

export default userModel
