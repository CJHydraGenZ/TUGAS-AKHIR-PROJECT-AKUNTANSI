exports.data_laba_rugi = (data) => {
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
  const LData = {
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
  };
  return LData;
};
