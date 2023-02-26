import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Chat from "../models/Chat.js";
import User from "../models/User.js";
import nodemailer from "nodemailer";

// REGISTER

export const feedback = async (req, res) => {
  try {
    const { name, subject, feedback } = req.body;
    let mailTransporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",

      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
      secure: true,
    });

    let message = {
      from: process.env.EMAIL,
      to: "dbmlbb01@gmail.com",
      subject: subject,
      text: "pesan",
      html: `
      <div style="
      width: 100%; 
      background-color: transparent;
      ">
      <b>Dari : ${name}</b><br>Feedback : ${feedback}<br/>
      </div>
      
      `,
    };
    mailTransporter.sendMail(message, (err) => {
      if (err) {
        console.log(err);
      } else {
        res.json("berhasil");
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      data,
      location,
      occupation,
    } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      data,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// LOGGING IN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "Emailnya salah" });

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
      return res.status(400).json({ msg: "Passwordnya salah" });

    user.password = undefined;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//REFRESH DATA
export const refreshData = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
