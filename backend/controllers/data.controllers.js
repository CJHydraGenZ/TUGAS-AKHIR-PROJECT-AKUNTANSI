require("dotenv").config();
const Data = require("../models/data.model");

exports.TambahData = async (req, res) => {
  const { funcL, item, jumlahHarga, total } = req.body;

  const data = new Data({
    funcL,
    item,
    jumlahHarga,
    total,
  });
  data.save();
  return res.status(201).json({
    status: true,
    msg: "Berasil di Tambah",
  });
};
// const user = await User.findOne({ _id: req.id });

exports.getData = async (req, res) => {
  console.log(req.params.lb);
  const data = await Data.find({ funcL: `${req.params.lb}` });
  return res.status(200).json({
    status: true,
    msg: "berhasil",
    data: data,
  });
};
exports.updateData = async (req, res) => {
  console.log(req.params.up);
  const { funcL, item, jumlahHarga, total } = req.body;
  const data = await Data.findByIdAndUpdate(
    { _id: `${req.params.up}` },
    {
      $set: {
        item: item,
        jumlahHarga: jumlahHarga,
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
  // console.log(data);
  return res.status(200).json({
    status: true,
    msg: "berhasil di Update",
    data: data,
  });
};
exports.deleteData = async (req, res) => {
  console.log(req.params.up);
  // const { funcL, item, jumlahHarga, total } = req.body;
  const data = await Data.findByIdAndRemove(
    { _id: `${req.params.up}` },

    (err, docs) => {
      if (err) {
        console.log(err);
      } else {
        console.log("delete User : ", docs);
      }
    }
  );
  // console.log(data);
  return res.status(204).json({
    status: true,
    msg: "berhasil di Hapus",
  });
};
exports.getAllData = async (req, res) => {
  // console.log(req.params.lb);
  const data = await Data.find();
  return res.status(200).json({
    status: true,
    msg: "berhasil",
    data: data,
  });
};
