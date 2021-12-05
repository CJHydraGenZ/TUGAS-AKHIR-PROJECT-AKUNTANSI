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

exports.updateUser = async (req, res) => {
  console.log(req.params.uid);
  // const { funcL, item, jumlahHarga, tanggal } = req.body;
  console.log(req.body);
  // const { email, userlevel, password, nama, jenis_kelamin, alamat } = req.body;
  // console.log(kuantitas, harga, tanggal);
  // const data = await User.findByIdAndUpdate(
  //   { _id: `${req.params.uid}` },
  //   {
  //     $set: {
  //       email: email,
  //       userlevel: userlevel,
  //       password: password,
  //       nama: nama,
  //       jenis_kelamin: jenis_kelamin,
  //       alamat: alamat,
  //     },
  //   },
  //   { useFindAndModify: false },
  //   (err, docs) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log("Updated User : ", docs);
  //     }
  //   }
  // );
  // console.log(data);
  return res.status(200).json({
    status: true,
    msg: "berhasil di Update",
    data: data,
    code: "update",
  });
};

exports.deleteUser = async (req, res) => {
  console.log(req.params.uid);
  // const { funcL, item, jumlahHarga, total } = req.body;
  const data = await User.findByIdAndRemove(
    { _id: `${req.params.uid}` },

    (err, docs) => {
      if (err) {
        console.log(err);
      } else {
        console.log("delete User : ", docs);
      }
    }
  );
  // console.log(data);
  return res.status(200).json({
    status: true,
    msg: "berhasil di Hapus",
    code: "delete",
  });
};

exports.getUser = async (req, res) => {
  const user = await User.find();
  return res.status(200).json({
    status: true,
    msg: "berhasil",
    data: user,
  });
};
