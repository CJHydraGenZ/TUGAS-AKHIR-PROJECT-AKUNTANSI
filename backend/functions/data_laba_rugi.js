const wraping = (e, t, data) => {
  const res = data;
  const ename = res
    .map((x, i) => {
      if (x.funcL === e) {
        return x;
      }
    })
    .filter((f) => f);
  let total = ename
    .map(({ item, jumlahHarga }) => +jumlahHarga)
    .reduce((acc, curr) => curr + acc, 0);

  return {
    [e]: ename,
    [t]: total,
  };
};

exports.data_laba_rugi = (data) => {
  const { tpu, totalTPU } = wraping("tpu", "totalTPU", data);
  const { tbp, totalTBP } = wraping("tbp", "totalTBP", data);
  const { bpeg, totalBPEG } = wraping("bpeg", "totalBPEG", data);
  const { bk, totalBK } = wraping("bk", "totalBK", data);
  const { bpen, totalBPEN } = wraping("bpen", "totalBPEN", data);
  const { pl, totalPL } = wraping("pl", "totalBL", data);
  const { bl, totalBL } = wraping("bl", "totalBL", data);
  // console.log("ini res", tpu);
  //? neraca
  const { al, totalAL } = wraping("al", "totalAL", data); //!  untuk aset tetap rumusnya beda
  const { atl, totalATL } = wraping("atl", "totalATL", data);
  const { at, totalAT } = wraping("at", "totalAT", data);
  const { kl, totalKL } = wraping("kl", "totalKL", data);
  const { kjp, totalKJP } = wraping("kjp", "totalKJP", data);
  const { ekuitas, totalEKUITAS } = wraping("ekuitas", "totalEKUITAS", data);

  //? lap. keuangan
  const { kdsk, totalKDSK } = wraping("kdsk", "totalKDSK", data);
  const { pd, totalPD } = wraping("pd", "totalPD", data);
  const { pil, totalPIL } = wraping("pil", "totalPIL", data);
  const { per, totalPER } = wraping("per", "totalPER", data);
  const { um, totalUM } = wraping("um", "totalUM", data);
  const { uu, totalUU } = wraping("uu", "totalUU", data);
  const { dt, totalDT } = wraping("dt", "totalDT", data);
  const { ul, totalUL } = wraping("ul", "totalUL", data);
  const { up, totalUP } = wraping("up", "totalUP", data);
  //! rumus
  let TOTAL_JUMLAH_ASET = totalAL + totalATL + totalAT;
  let TOTAL_KNE = totalKL + totalKJP + totalEKUITAS;

  let LR1 = totalTPU - totalTBP;
  let LR2 = totalBPEG + totalBK + totalBPEN;
  let LR3 = totalBL - totalPL;
  let LABA_RUGI = LR1 - LR2 + LR3;
  const LData = {
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
    neraca: {
      al: {
        data: al,
        total: totalAL,
      },
      atl: {
        data: atl,
        total: totalATL,
      },
      at: {
        data: at,
        total: totalAT,
      },
      kl: {
        data: kl,
        total: totalKL,
      },
      kjp: {
        data: kjp,
        total: totalKJP,
      },
      ekuitas: {
        data: ekuitas,
        total: totalEKUITAS,
      },

      TOTAL_JUMLAH_ASET,
      TOTAL_KNE,
    },
    lap_keuangan: {
      kdsk: {
        data: kdsk,
        total: totalKDSK,
      },
      pd: {
        data: pd,
        total: totalPD,
      },
      pil: {
        data: pil,
        total: totalPIL,
      },
      per: {
        data: per,
        total: totalPER,
      },
      um: {
        data: um,
        total: totalUM,
      },
      uu: {
        data: uu,
        total: totalUU,
      },
      dt: {
        data: dt,
        total: totalDT,
      },
      ul: {
        data: ul,
        total: totalUL,
      },
      up: {
        data: up,
        total: totalUP,
      },
    },
  };
  return LData;
};
