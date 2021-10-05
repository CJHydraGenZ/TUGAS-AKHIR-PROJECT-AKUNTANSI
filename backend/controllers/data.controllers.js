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
    msg: "Berasil Tambah",
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
