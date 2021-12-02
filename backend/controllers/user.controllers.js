require("dotenv").config();
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.DaftarUser = async (req, res) => {
  const {
    nama,
    username,
    email,
    userlevel,
    password,
    jenis_kelamin,
    alamat,
    last_login,
    status,
  } = req.body;

  const emailUser = await User.findOne({
    email: email,
  });
  const usernameUser = await User.findOne({
    username: username,
  });
  if (usernameUser) {
    return res.status(404).json({
      // status: false,
      username: "username sudah tersedia!",
    });
  }

  if (emailUser) {
    return res.status(404).json({
      // status: false,
      email: "email sudah tersedia!",
    });
  }

  const user = new User({
    nama,
    username,
    email,
    userlevel,
    password: await bcrypt.hash(password, 10),
    jenis_kelamin,
    alamat,
    status,
    createAt: Date.now(),
  });
  user.save();
  return res.status(201).json({
    // status: true,
    msg: "Berasil daftar",
  });
};

exports.LoginUser = async (req, res) => {
  const { username, password } = req.body;

  const dataUser = await User.findOne({
    $or: [{ username: username }, { email: username }],
  });
  // console.log("ini id", dataUser._id);
  // console.log("ini data user", dataUser);
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

      // const time_login = new User({
      //   // _id: `${dataUser._id}`

      //   last_login: {
      //     nama: dataUser.nama,
      //     userId: `${dataUser._id}`,
      //     last_login: Date.now(),
      //   },
      // });
      // time_login.save();
      // await User.findByIdAndUpdate(
      //   {
      //     _id: `${dataUser._id}`,
      //   },
      //   {
      //     $set: {
      //       last_login: Date.now(),
      //     },
      //   }
      // );
      await User.findByIdAndUpdate(
        {
          _id: `${dataUser._id}`,
        },
        {
          $set: {
            last_login: Date.now(),
          },
        },
        { useFindAndModify: false },
        (err, docs) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Updated User : ", docs);
          }
        }
      );
      return res.status(200).json({
        status: true,
        msg: "User berhasil login!",
        token: token,
        userlevel: user.userlevel,
      });
    } else {
      return res.status(404).json({
        status: false,

        password: "password tidak sama ",
      });
    }
  } else {
    return res.status(404).json({
      status: false,

      username: "username atau email tidak tersedia",
    });
  }
};

exports.getUser = async (req, res) => {
  const user = await User.find();
  return res.status(200).json({
    status: true,
    msg: "berhasil",
    data: user,
  });
};
// const rows = [
//   {
//     id: 1,
//     nama: randomTraderName(),
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//   },
//   {
//     id: 2,
//     nama: randomTraderName(),
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//   },
//   {
//     id: 3,
//     nama: randomTraderName(),
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//   },
//   {
//     id: 4,
//     nama: randomTraderName(),
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//   },
//   {
//     id: 5,
//     nama: randomTraderName(),
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//   },
// ];
