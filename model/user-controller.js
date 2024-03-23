import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const userModel = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  token: {
    type: String,
  },
  isVerified: {
    type: Boolean,
  },
  OTP: {
    type: String,
  },
});

userModel.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, "process.env.SECRET_KEY");
    this.token = token;
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
  }
};

const authuser = mongoose.model("user", userModel);

export default authuser;
