require("dotenv").config();
const Data = require("../models/data.model");
const Laba = require("../models/laba.model");

exports.TambahData = async (req, res) => {
  const { funcL, item, jumlahHarga, tanggal } = req.body;

  const data = new Data({
    funcL,
    item,
    jumlahHarga,
    tanggal,
  });
  data.save();
  return res.status(201).json({
    status: true,
    msg: "Berasil di Tambah",
    code: "add",
  });
};
// const user = await User.findOne({ _id: req.id });

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

// exports.getData = async (req, res) => {
//   console.log(req.params.lb);
//   const data = await Data.find({ funcL: `${req.params.lb}` });
//   return res.status(200).json({
//     status: true,
//     msg: "berhasil",
//     data: data,
//   });
// };

//? Udah Di dapat Algoritamnya
exports.getData = async (req, res) => {
  const { awal, akhir } = req.body;
  console.log(req.params.lb);

  const data = await Data.find({
    tanggal: {
      $gte: "2021-10-16T16:00:00.000+00:00", //! bisa menggunakan pilihan
      $lt: "2021-12-30T16:00:00.000+00:00", //! pilihan aja
    },
  });
  return res.status(200).json({
    status: true,
    msg: "berhasil",
    data: data,
  });
};

exports.getSPecData = async (req, res) => {
  const { awal, akhir } = req.body;
  // console.log(req.params.lb);
  // console.log("ini awal", awal, "inni akhir", akhir);
  if (awal && akhir) {
    const data = await Data.find({
      tanggal: {
        $gte: `${awal}`, //! bisa menggunakan pilihan
        $lt: `${akhir}`, //! pilihan aja
      },
    });
    const tpu = data
      .map((x, i) => {
        if (x.funcL === "tpu") {
          return x;
        }
      })
      .filter((f) => f);
    let totalTPU = tpu
      .map(({ item, jumlahHarga }) => +jumlahHarga)
      .reduce((acc, curr) => curr + acc, 0);

    const tbp = data
      .map((x, i) => {
        if (x.funcL === "tbp") {
          return x;
        }
      })
      .filter((f) => f);
    let totalTBP = tbp
      .map(({ item, jumlahHarga }) => +jumlahHarga)
      .reduce((acc, curr) => curr + acc, 0);

    const bpeg = data
      .map((x, i) => {
        if (x.funcL === "bpeg") {
          return x;
        }
      })
      .filter((f) => f);
    let totalBPEG = bpeg
      .map(({ item, jumlahHarga }) => +jumlahHarga)
      .reduce((acc, curr) => curr + acc, 0);
    const bk = data
      .map((x, i) => {
        if (x.funcL === "bk") {
          return x;
        }
      })
      .filter((f) => f);
    let totalBK = bk
      .map(({ item, jumlahHarga }) => +jumlahHarga)
      .reduce((acc, curr) => curr + acc, 0);

    const bpen = data
      .map((x, i) => {
        if (x.funcL === "bpen") {
          return x;
        }
      })
      .filter((f) => f);
    let totalBPEN = bpen
      .map(({ item, jumlahHarga }) => +jumlahHarga)
      .reduce((acc, curr) => curr + acc, 0);

    const pl = data
      .map((x, i) => {
        if (x.funcL === "pl") {
          return x;
        }
      })
      .filter((f) => f);
    let totalPL = pl
      .map(({ item, jumlahHarga }) => +jumlahHarga)
      .reduce((acc, curr) => curr + acc, 0);

    const bl = data
      .map((x, i) => {
        if (x.funcL === "bl") {
          return x;
        }
      })
      .filter((f) => f);
    let totalBL = bl
      .map(({ item, jumlahHarga }) => +jumlahHarga)
      .reduce((acc, curr) => curr + acc, 0);

    let LR1 = totalTPU - totalTBP;
    let LR2 = totalBPEG + totalBK + totalBPEN;
    let LR3 = totalBL - totalPL;
    let LABA_RUGI = LR1 - LR2 + LR3;
    return res.status(200).json({
      status: true,
      msg: "Get Specific Data Success",
      data: {
        tpu: {
          data: tpu,
          total: totalTPU,
        },
        tbp: {
          data: tbp,
          total: totalTBP,
        },
        bpeg: {
          data: bpeg,
          total: totalBPEG,
        },
        bk: {
          data: bk,
          total: totalBK,
        },
        bpen: {
          data: bpen,
          total: totalBPEN,
        },
        pl: {
          data: pl,
          total: totalPL,
        },
        bl: {
          data: bl,
          total: totalBL,
        },
        LR1: LR1,
        LR2: LR2,
        LR3: LR3,
        LABA_RUGI: LABA_RUGI,
      },
    });
  } else {
    const data = await Data.find();
    const tpu = data
      .map((x, i) => {
        if (x.funcL === "tpu") {
          return x;
        }
      })
      .filter((f) => f);
    let totalTPU = tpu
      .map(({ item, jumlahHarga }) => +jumlahHarga)
      .reduce((acc, curr) => curr + acc, 0);

    const tbp = data
      .map((x, i) => {
        if (x.funcL === "tbp") {
          return x;
        }
      })
      .filter((f) => f);
    let totalTBP = tbp
      .map(({ item, jumlahHarga }) => +jumlahHarga)
      .reduce((acc, curr) => curr + acc, 0);

    const bpeg = data
      .map((x, i) => {
        if (x.funcL === "bpeg") {
          return x;
        }
      })
      .filter((f) => f);
    let totalBPEG = bpeg
      .map(({ item, jumlahHarga }) => +jumlahHarga)
      .reduce((acc, curr) => curr + acc, 0);
    const bk = data
      .map((x, i) => {
        if (x.funcL === "bk") {
          return x;
        }
      })
      .filter((f) => f);
    let totalBK = bk
      .map(({ item, jumlahHarga }) => +jumlahHarga)
      .reduce((acc, curr) => curr + acc, 0);

    const bpen = data
      .map((x, i) => {
        if (x.funcL === "bpen") {
          return x;
        }
      })
      .filter((f) => f);
    let totalBPEN = bpen
      .map(({ item, jumlahHarga }) => +jumlahHarga)
      .reduce((acc, curr) => curr + acc, 0);

    const pl = data
      .map((x, i) => {
        if (x.funcL === "pl") {
          return x;
        }
      })
      .filter((f) => f);
    let totalPL = pl
      .map(({ item, jumlahHarga }) => +jumlahHarga)
      .reduce((acc, curr) => curr + acc, 0);

    const bl = data
      .map((x, i) => {
        if (x.funcL === "bl") {
          return x;
        }
      })
      .filter((f) => f);
    let totalBL = bl
      .map(({ item, jumlahHarga }) => +jumlahHarga)
      .reduce((acc, curr) => curr + acc, 0);

    let LR1 = totalTPU - totalTBP;
    let LR2 = totalBPEG + totalBK + totalBPEN;
    let LR3 = totalBL - totalPL;
    let LABA_RUGI = LR1 - LR2 + LR3;

    const laba = new Laba({
      laba_rugi: {
        tpu: {
          data: tpu,
          total: totalTPU,
        },
        tbp: {
          data: tbp,
          total: totalTBP,
        },
        bpeg: {
          data: bpeg,
          total: totalBPEG,
        },
        bk: {
          data: bk,
          total: totalBK,
        },
        bpen: {
          data: bpen,
          total: totalBPEN,
        },
        pl: {
          data: pl,
          total: totalPL,
        },
        bl: {
          data: bl,
          total: totalBL,
        },
        LR1: LR1,
        LR2: LR2,
        LR3: LR3,
        LABA_RUGI: LABA_RUGI,
      },
    });
    laba.save();

    return res.status(200).json({
      status: true,
      msg: "Get All Data Success",
      data: {
        tpu: {
          data: tpu,
          total: totalTPU,
        },
        tbp: {
          data: tbp,
          total: totalTBP,
        },
        bpeg: {
          data: bpeg,
          total: totalBPEG,
        },
        bk: {
          data: bk,
          total: totalBK,
        },
        bpen: {
          data: bpen,
          total: totalBPEN,
        },
        pl: {
          data: pl,
          total: totalPL,
        },
        bl: {
          data: bl,
          total: totalBL,
        },
        LR1: LR1,
        LR2: LR2,
        LR3: LR3,
        LABA_RUGI: LABA_RUGI,
      },
    });
  }
};
