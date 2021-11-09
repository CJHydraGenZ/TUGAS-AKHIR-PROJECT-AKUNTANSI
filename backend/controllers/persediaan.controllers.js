require("dotenv").config();
const Data = require("../models/data.model");

const Persediaan = require("../models/persediaan.model");
const DataPersediaan = require("../models/data.persediaan.model");

const { unique } = require("../functions/uniqueArray");
const { kuantitas } = require("../functions/reduce");

exports.TambahDataPersediaan = async (req, res) => {
  const { persediaanName, funcL, kuantitas, harga, tanggal } = req.body;
  // console.log("tahun", new Date().getFullYear());
  const tahun = new Date(tanggal).getFullYear().toString();
  // console.log("tanggal", new Date(tanggal).getFullYear().toString());
  console.log(persediaanName);

  let jumlah = kuantitas * harga;
  const data = new Persediaan({
    persediaanName,
    funcL,
    kuantitas,
    harga,
    tanggal,
    tahun,
    jumlah,
  });
  data.save();
  const penjualan = await Persediaan.find({
    persediaanName: `${req.params.funcL}`,
    funcL: `penjualan`,
  });
  const pembelian = await Persediaan.find({
    persediaanName: `${req.params.funcL}`,
    funcL: `pembelian`,
  });
  const data_persediaan = new DataPersediaan({
    // persediaanName,
    persediaanData: {
      [persediaanName]: {
        penjualan,
        pembelian,
      },
    },
  });
  data_persediaan.save();
  return res.status(201).json({
    status: true,
    msg: "Berasil di Tambah",
    code: "add",
  });
};
// const user = await User.findOne({ _id: req.id });

exports.updateDataPersediaan = async (req, res) => {
  console.log(req.params.upt);
  // const { funcL, item, jumlahHarga, tanggal } = req.body;
  const { persediaanName, funcL, kuantitas, harga, tanggal } = req.body;

  const data = await Data.findByIdAndUpdate(
    { _id: `${req.params.upt}` },
    {
      $set: {
        kuantitas: kuantitas,
        harga: harga,
        tanggal: tanggal,
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
    code: "update",
  });
};
exports.deleteDataPersediaan = async (req, res) => {
  console.log(req.params.upt);
  // const { funcL, item, jumlahHarga, total } = req.body;
  const data = await Data.findByIdAndRemove(
    { _id: `${req.params.upt}` },

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

exports.getAllDataPersediaan = async (req, res) => {
  // console.log(req.params.lb);
  const tahun = new Date().getFullYear().toString();

  const data = await Persediaan.find({ tahun });
  const penjualan = await Persediaan.find({
    tahun,
    funcL: `penjualan`,
  });
  const pembelian = await Persediaan.find({
    tahun,
    funcL: `pembelian`,
  });

  const totalPembelian = kuantitas(pembelian);
  const totalPenjualan = kuantitas(penjualan);

  const swif = unique(data);

  return res.status(200).json({
    status: true,
    msg: "berhasil",
    data: {
      persediaan: {
        pembelian: {
          data: pembelian,
          total: totalPembelian,
        },
        penjualan: {
          data: penjualan,
          total: totalPenjualan,
        },
        swif: swif,
      },
    },
  });
};

exports.getAllDataPersediaanSpec = async (req, res) => {
  console.log(req.params.funcL);
  // req.params.funcL
  // const data = await Persediaan.find({ funcL: `${req.params.funcL}` });
  const penjualan = await Persediaan.find({
    persediaanName: `${req.params.funcL}`,
    funcL: `penjualan`,
  });
  const pembelian = await Persediaan.find({
    persediaanName: `${req.params.funcL}`,
    funcL: `pembelian`,
  });

  const totalPembelian = kuantitas(pembelian);
  const totalPenjualan = kuantitas(penjualan);

  return res.status(200).json({
    status: true,
    msg: "berhasil",
    data: {
      persediaan: {
        pembelian: {
          data: pembelian,
          total: totalPembelian,
        },
        penjualan: {
          data: penjualan,
          total: totalPenjualan,
        },
      },
    },
  });
};
//!ini versi bagusnya
// data: {
//   [req.params.funcL]: {
//     penjualan,
//     pembelian,
//   },
// },
