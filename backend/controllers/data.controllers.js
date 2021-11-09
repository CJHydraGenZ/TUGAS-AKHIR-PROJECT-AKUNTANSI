require("dotenv").config();
const Data = require("../models/data.model");
const Laba = require("../models/laba.model");
const Neraca = require("../models/neraca.model");
const Persediaan = require("../models/persediaan.model");
const DataPersediaan = require("../models/data.persediaan.model");
const { data_laba_rugi } = require("../functions/data_laba_rugi");
const { data_neraca } = require("../functions/data_neraca");
const { unique } = require("../functions/uniqueArray");
const { kuantitas } = require("../functions/reduce");

exports.TambahData = async (req, res) => {
  const { funcL, item, jumlahHarga, tanggal } = req.body;
  // console.log("tahun", new Date().getFullYear());
  const tahun = new Date(tanggal).getFullYear().toString();
  // console.log("tanggal", new Date(tanggal).getFullYear().toString());
  const data = new Data({
    funcL,
    item,
    jumlahHarga,
    tanggal,
    tahun,
  });
  data.save();
  return res.status(201).json({
    status: true,
    msg: "Berasil di Tambah",
    code: "add",
  });
};
// funcL: {
//   type: String,
// },
// kuantitas: {
//   type: Number,
// },
// harga: {
//   type: Number,
// },
// tanggal: {
//   type: Date,
// },
// tahun: {
//   type: String,
// },
// jumlah: {
//   type: Number,
// },
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
exports.updateData = async (req, res) => {
  console.log(req.params.up);
  const { funcL, item, jumlahHarga, tanggal } = req.body;
  const data = await Data.findByIdAndUpdate(
    { _id: `${req.params.up}` },
    {
      $set: {
        item: item,
        jumlahHarga: jumlahHarga,
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
exports.getAllData = async (req, res) => {
  // console.log(req.params.lb);
  const data = await Data.find();
  return res.status(200).json({
    status: true,
    msg: "berhasil",
    data: data,
  });
};

exports.getData = async (req, res) => {
  console.log(req.params.lb);
  const data = await Data.find({ funcL: `${req.params.lb}` });
  return res.status(200).json({
    status: true,
    msg: "berhasil",
    data: data,
  });
};

//? Udah Di dapat Algoritamnya
// exports.getData = async (req, res) => {
//   const { awal, akhir } = req.body;
//   console.log(req.params.lb);

//   const data = await Data.find({
//     tanggal: {
//       $gte: "2021-10-16T16:00:00.000+00:00", //! bisa menggunakan pilihan
//       $lt: "2021-12-30T16:00:00.000+00:00", //! pilihan aja
//     },
//   });
//   return res.status(200).json({
//     status: true,
//     msg: "berhasil",
//     data: data,
//   });
// };

exports.getSPecData = async (req, res) => {
  const tahun = new Date().getFullYear().toString();
  const data = await Data.find({ tahun });
  const LData = data_laba_rugi(data);
  const laba = new Laba({
    userId: req.id,
    data: LData,
    waktu_get: Date.now(),
  });
  laba.save();
  return res.status(200).json({
    status: true,
    msg: "Get All Data Success",
    data: LData,
  });
};

exports.PostSPecData = async (req, res) => {
  const { awal, akhir } = req.body;

  console.log("ini awal", awal, "inni akhir", akhir);
  if (awal && akhir) {
    const data = await Data.find({
      tanggal: {
        $gte: `${awal}`, //! bisa menggunakan pilihan
        $lt: `${akhir}`, //! pilihan aja
      },
    });
    const LData = data_laba_rugi(data);
    // console.log("ini data", LData);

    const laba = new Laba({
      userId: req.id,
      data: LData,
      waktu_get: akhir,
    });
    laba.save();

    return res.status(200).json({
      status: true,
      msg: "Get Specific Data Success",
      data: LData,
    });
  }
};
// exports.getSPecNeraca = async (req, res) => {
//   const tahun = new Date().getFullYear().toString();
//   const data = await Data.find({ tahun });
//   const NData = data_neraca(data);
//   const laba = new Laba({
//     userId: req.id,
//     data: NData,
//     waktu_get: Date.now(),
//   });
//   laba.save();
//   return res.status(200).json({
//     status: true,
//     msg: "Get All Data Success",
//     data: NData,
//   });
// };

// exports.PostSPecNeraca = async (req, res) => {
//   const { awal, akhir } = req.body;

//   // console.log("ini awal", awal, "inni akhir", akhir);
//   if (awal && akhir) {
//     const data = await Data.find({
//       tanggal: {
//         $gte: `${awal}`, //! bisa menggunakan pilihan
//         $lt: `${akhir}`, //! pilihan aja
//       },
//     });
//     const NData = data_neraca(data);
//     // console.log("ini data", NData);

//     const laba = new Laba({
//       userId: req.id,
//       data: NData,
//       waktu_get: akhir,
//     });
//     laba.save();

//     return res.status(200).json({
//       status: true,
//       msg: "Get Specific Data Success",
//       data: NData,
//     });
//   }
// };
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
