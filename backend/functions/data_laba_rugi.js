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
const wraping_at = (e, t, data) => {
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
    .reduce((acc, curr) => curr - acc, 0);

  return {
    [e]: ename,
    [t]: Math.abs(total),
  };
};

exports.data_laba_rugi = (data) => {
  //? laba rugi
  const { tpu, totalTPU } = wraping("tpu", "totalTPU", data);
  const { tbp, totalTBP } = wraping("tbp", "totalTBP", data);
  const { bpeg, totalBPEG } = wraping("bpeg", "totalBPEG", data);
  const { bk, totalBK } = wraping("bk", "totalBK", data);
  const { bpen, totalBPEN } = wraping("bpen", "totalBPEN", data);
  const { pl, totalPL } = wraping("pl", "totalPL", data);
  const { bl, totalBL } = wraping("bl", "totalBL", data);
  // console.log("ini res", tpu);
  //? neraca
  const { al, totalAL } = wraping("al", "totalAL", data); //!  untuk aset tetap rumusnya beda
  const { atl, totalATL } = wraping("atl", "totalATL", data);
  const { at, totalAT } = wraping_at("at", "totalAT", data);
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
  let sumLR = LR1 - LR2;
  let LABA_RUGI = sumLR - LR3;
  const grafLaba = [
    {
      name: "Page A",
      total: 4000,
    },
    {
      name: "Page B",
      total: 3000,
    },
    {
      name: "Page C",
      total: 2000,
    },
    {
      name: "Page D",
      total: 2780,
    },
    {
      name: "Page E",
      total: 1890,
    },
    {
      name: "Page F",
      total: 2390,
    },
    {
      name: "Page G",
      total: 3490,
    },
  ];
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
      grafLaba: [
        {
          name: "Pendapatan Usaha",
          total: totalTPU,
        },
        {
          name: "Beban Diluar Usaha",
          total: totalTBP,
        },
        {
          name: "Beban Pengawai",
          total: totalBPEG,
        },
        {
          name: "Beban Kantor",
          total: totalBK,
        },
        {
          name: "Beban Penyusutan",
          total: totalBPEN,
        },
        {
          name: "Pendapatan lain-lain",
          total: totalPL,
        },
        {
          name: "Beban lain-lain",
          total: totalBL,
        },
      ],
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
      grafNeraca: [
        {
          name: "Aset Lancar",
          total: totalAL,
        },
        {
          name: "Aset Tidak Lancar",
          total: totalATL,
        },
        {
          name: "Aset Tetap",
          total: totalAT,
        },
        {
          name: "Kewajiban Lancar",
          total: totalKL,
        },
        {
          name: "Kewajiban Jangka Panjang",
          total: totalKJP,
        },
        {
          name: "Ekuitas",
          total: totalEKUITAS,
        },
      ],
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
      grafLap_keuangan: [
        {
          name: "Kas dan Setara Kas",
          total: totalKDSK,
        },
        {
          name: "Piutang Dagang",
          total: totalPD,
        },
        {
          name: "Piutang Lain-lain",
          total: totalPIL,
        },
        {
          name: "Persediaan",
          total: totalPER,
        },
        {
          name: "Uang Muka",
          total: totalUM,
        },
        {
          name: "Utang Usaha",
          total: totalUU,
        },
        {
          name: "Dana Titipan",
          total: totalDT,
        },
        {
          name: "Utang Leasing",
          total: totalUL,
        },
        {
          name: "Utang Pajak",
          total: totalUP,
        },
      ],
    },
  };
  return LData;
};

// exports.dataDashboard = (data) => {
//   const { tpu, totalTPU } = wraping("tpu", "totalTPU", data);
//   const { tbp, totalTBP } = wraping("tbp", "totalTBP", data);
//   const { bpeg, totalBPEG } = wraping("bpeg", "totalBPEG", data);
//   const { bk, totalBK } = wraping("bk", "totalBK", data);
//   const { bpen, totalBPEN } = wraping("bpen", "totalBPEN", data);
//   const { pl, totalPL } = wraping("pl", "totalPL", data);
//   const { bl, totalBL } = wraping("bl", "totalBL", data);

//   ///! pendapatan dan pengeluaran (beban) dari laba rugi

//   // const LData
//   return null;
// };

exports.dataGraf = (data) => {
  //? laba rugi
  const { tpu, totalTPU } = wraping("tpu", "totalTPU", data);
  const { tbp, totalTBP } = wraping("tbp", "totalTBP", data);
  const { bpeg, totalBPEG } = wraping("bpeg", "totalBPEG", data);
  const { bk, totalBK } = wraping("bk", "totalBK", data);
  const { bpen, totalBPEN } = wraping("bpen", "totalBPEN", data);
  const { pl, totalPL } = wraping("pl", "totalPL", data);
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

  const LData = {
    grafLaba: [
      {
        name: "Pendapatan Usaha",
        total: totalTPU,
      },
      {
        name: "Beban Diluar Usaha",
        total: totalTBP,
      },
      {
        name: "Beban Pengawai",
        total: totalBPEG,
      },
      {
        name: "Beban Kantor",
        total: totalBK,
      },
      {
        name: "Beban Penyusutan",
        total: totalBPEN,
      },
      {
        name: "Pendapatan lain-lain",
        total: totalPL,
      },
      {
        name: "Beban lain-lain",
        total: totalBL,
      },
    ],
    grafNeraca: [
      {
        name: "Aset Lancar",
        total: totalAL,
      },
      {
        name: "Aset Tidak Lancar",
        total: totalATL,
      },
      {
        name: "Aset Tetap",
        total: totalAT,
      },
      {
        name: "Kewajiban Lancar",
        total: totalKL,
      },
      {
        name: "Kewajiban Jangka Panjang",
        total: totalKJP,
      },
      {
        name: "Ekuitas",
        total: totalEKUITAS,
      },
    ],
    grafLap_keuangan: [
      {
        name: "Kas dan Setara Kas",
        total: totalKDSK,
      },
      {
        name: "Piutang Dagang",
        total: totalPD,
      },
      {
        name: "Piutang Lain-lain",
        total: totalPIL,
      },
      {
        name: "Persediaan",
        total: totalPER,
      },
      {
        name: "Uang Muka",
        total: totalUM,
      },
      {
        name: "Utang Usaha",
        total: totalUU,
      },
      {
        name: "Dana Titipan",
        total: totalDT,
      },
      {
        name: "Utang Leasing",
        total: totalUL,
      },
      {
        name: "Utang Pajak",
        total: totalUP,
      },
    ],
  };
  return LData;
};
