require("dotenv").config();
// const Data = require("../models/data.model");

const Persediaan = require("../models/persediaan.model");
const DataPersediaan = require("../models/data.persediaan.model");

const { unique } = require("../functions/uniqueArray");
const {
  kuantitas,
  sumTotal,
  convertArrayReduseObject,
} = require("../functions/reduce");
const { arrayObject } = require("../functions/arrayObject");

exports.TambahDataPersediaan = async (req, res) => {
  const {
    kategori,
    persediaanName,
    funcL,
    namaP,
    kuantitas,
    satuan,
    harga,
    tanggal,
  } = req.body;
  // console.log("tahun", new Date().getFullYear());
  const tahun = new Date(tanggal).getFullYear().toString();
  // console.log("tanggal", new Date(tanggal).getFullYear().toString());
  console.log(persediaanName, funcL, kuantitas, harga);

  let jumlah = kuantitas * harga;
  const data = new Persediaan({
    kategori,
    persediaanName,
    funcL,
    namaP,
    kuantitas,
    satuan,
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
  const piutang = await Persediaan.find({
    persediaanName: `${req.params.funcL}`,
    funcL: `piutang`,
  });
  const data_persediaan = new DataPersediaan({
    // persediaanName,
    persediaanData: {
      [persediaanName]: {
        penjualan,
        pembelian,
        piutang,
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
  const { persediaanName, funcL, namaP, kuantitas, harga, tanggal } = req.body;
  // console.log(kuantitas, harga, tanggal);
  const data = await Persediaan.findByIdAndUpdate(
    { _id: `${req.params.upt}` },
    {
      $set: {
        namaP: namaP,
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
  const data = await Persediaan.findByIdAndRemove(
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

// exports.updateData = async (req, res) => {
//   console.log(req.params.up);
//   const { funcL, item, jumlahHarga, tanggal } = req.body;
//   const data = await Data.findByIdAndUpdate(
//     { _id: `${req.params.up}` },
//     {
//       $set: {
//         item: item,
//         jumlahHarga: jumlahHarga,
//         tanggal: tanggal,
//       },
//     },
//     { useFindAndModify: false },
//     (err, docs) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log("Updated User : ", docs);
//       }
//     }
//   );
// }
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

  const piutang = await Persediaan.find({
    tahun,
    funcL: `piutang`,
  });
  const totalPembelian = kuantitas(pembelian);
  const totalPenjualan = kuantitas(penjualan);
  const totalPiutang = kuantitas(piutang);
  const lbp = convertArrayReduseObject(penjualan);
  // console.log(penjualan);
  const swif = unique(data);
  //! buat saldo disini
  const laba_rugi_persediaan = arrayObject(data);
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
          // kuantitas: totalPembelian - totalPenjualan,
          // saldo: saldo,
        },
        piutang: {
          data: piutang,
          total: totalPiutang,
        },
        laba_rugi_persediaan: {
          penjualan: lbp,
        },
        // data: data,

        swif: swif,
      },
    },
  });
};

exports.getAllDataPersediaanSpec = async (req, res) => {
  console.log(req.body);
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
  const piutang = await Persediaan.find({
    persediaanName: `${req.params.funcL}`,
    funcL: `piutang`,
  });

  const saldo = await Persediaan.findOne({
    persediaanName: `${req.params.funcL}`,
    funcL: `pembelian`,
  });

  const totalPembelian = kuantitas(pembelian);
  const totalPenjualan = kuantitas(penjualan);
  const totalPiutang = kuantitas(piutang);
  const totalP = sumTotal(penjualan);
  const totalPiu = sumTotal(piutang);
  const sum = totalP + totalPiu;
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
          kuantitas: totalPembelian - totalPenjualan,
          saldo: saldo,
        },
        piutang: {
          data: piutang,
          total: totalPiutang,
        },
        laba_rugi_persediaan: {
          [req.params.funcL]: sum,
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

// ! rumus penjualan
// ? akan di kerjakan nanti
// jika ada harga berbeda maka harga yang di pakai adalah yang terkercil
//terus kuantitas dari harga terkecil akan terus dikurang sampai 0
//jika sampai 0 maka di pakai harga yang lebih besar

exports.getSaldo = async (req, res) => {
  const pembelian = await Persediaan.findOne({
    persediaanName: `${req.params.funcL}`,
    funcL: `pembelian`,
  });

  return res.status(200).json({
    status: true,
    msg: "berhasil",
    data: pembelian,
  });
};
