import e, { Router } from "express";
import authuser from "../model/user-controller.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import randomstring from "randomstring";

const router = Router();

router.get("/", async () => {
  console.log("server is running!");
});

router.post("/signup", async (req, res) => {
  const found = await authuser.findOne({ email: req.body.email });
  if (found && found.isVerified === true) {
    res.status(200).send({ success: false, message: "Email already exist!" });
  } else {
    if (found) await authuser.deleteMany({ email: req.body.email });

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    authuser.create({
      ...req.body,
      password: hashedPassword,
      isVerified: false,
      OTP: "",
    });
    res.status(200).send({ success: true, message: "OTP sent successfully" });
  }
});

router.post("/sendOTP", async (req, res) => {
  console.log(req.body.email);
  const otp = randomstring.generate({
    length: 6,
    charset: "numeric",
  });
  // Configure nodemailer with your email service provider
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "nsmc21129nitw@gmail.com",
      pass: "usch khfq irmx xqqj",
    },
  });

  // Construct email message
  const mailOptions = {
    from: "nsmc21129nitw@gmail.com",
    to: req.body.email,
    subject: "OTP Verification",
    text: `Your OTP to create account is: ${otp}`,
  };
  try {
    const found = await authuser.findOneAndUpdate(
      { email: req.body.email },
      { $set: { OTP: otp } }
    );
  } catch (error) {
    console.log(error);
  }

  // Send email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const check = await authuser.findOne({ email: req.body.email });
    if (check) {
      res.status(304).send({ success: false, message: "Already exist!" });
    } else {
      authuser.create(req.body);
      res.status(200).send({ success: true, message: "User registered" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const found = await authuser.findOne({ email: req.body.email });
    if (!found) {
      res.status(404).send({ success: false, message: "User not found!" });
    } else {
      const match = await bcrypt.compare(req.body.password, found.password);
      // console.log(match);
      if (match && found.isVerified === true) {
        const token = await found.generateAuthToken();
        found.token = token;
        const obj = {
          name: found.name,
          email: found.email,
          token: found.token,
        };

        res.send({ success: true, obj });
      } else {
        res
          .status(400)
          .send({ success: false, message: "Something went wrong" });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/verifyOTP", async (req, res) => {
  try {
    const found = await authuser.findOneAndUpdate(
      { email: req.body.email, OTP: req.body.OTP },
      { $set: { isVerified: true } }
    );
    if (found.OTP === req.body.OTP) {
      res.status(200).send({ success: true, message: "User Registered" });
    } else {
      res.status(401).send({ success: false, message: "Invalid OTP" });
    }
  } catch (error) {
    res.status(400).send({ success: false, message: "Something went wrong" });
  }
});

export default router;
