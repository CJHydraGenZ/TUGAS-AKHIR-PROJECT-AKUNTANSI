require("dotenv").config();
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.DaftarUser = async (req, res) => {
  const { username, email, userlevel, password } = req.body;

  const emailUser = await User.findOne({
    email: email,
  });
  const usernameUser = await User.findOne({
    username: username,
  });
  if (usernameUser) {
    return res.status(404).json({
      status: false,
      msg: "username sudah tersedia!",
    });
  }

  if (emailUser) {
    return res.status(404).json({
      status: false,
      msg: "email sudah tersedia!",
    });
  }

  const user = new User({
    username,
    email,
    userlevel,
    password: await bcrypt.hash(password, 10),
  });
  user.save();
  return res.status(201).json({
    status: true,
    msg: "Berasil daftar",
  });
};

exports.LoginUser = async (req, res) => {
  const { username, password } = req.body;

  const dataUser = await User.findOne({
    $or: [{ username: username }, { email: username }],
  });

  if (dataUser) {
    const passwordUser = await bcrypt.compare(password, dataUser.password);
    if (passwordUser) {
      const data = {
        id: dataUser._id,
      };
      const token = await jwt.sign(data, process.env.JWT);
      const user = await User.findOne({
        $or: [{ username: username }, { email: username }],
      });
      return res.status(200).json({
        status: true,
        msg: "User berhasil login!",
        token: token,
        userlevel: user.userlevel,
      });
    } else {
      return res.status(404).json({
        status: false,
        msg: "password tidak sama ",
      });
    }
  } else {
    return res.status(404).json({
      status: false,
      msg: "username atau email tidak tersedia",
    });
  }
};

exports.getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.id });
  return res.status(200).json({
    status: true,
    msg: "berhasil",
    data: user,
  });
};
