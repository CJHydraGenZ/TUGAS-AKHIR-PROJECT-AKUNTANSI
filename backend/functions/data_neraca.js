exports.data_neraca = (data) => {
  const al = data
    .map((x, i) => {
      if (x.funcL === "al") {
        return x;
      }
    })
    .filter((f) => f);
  let totalAL = al
    .map(({ item, jumlahHarga }) => +jumlahHarga)
    .reduce((acc, curr) => curr + acc, 0);

  const atl = data
    .map((x, i) => {
      if (x.funcL === "atl") {
        return x;
      }
    })
    .filter((f) => f);
  let totalATL = atl
    .map(({ item, jumlahHarga }) => +jumlahHarga)
    .reduce((acc, curr) => curr + acc, 0);

  const at = data
    .map((x, i) => {
      if (x.funcL === "at") {
        return x;
      }
    })
    .filter((f) => f);
  let totalAT = at
    .map(({ item, jumlahHarga }) => +jumlahHarga)
    .reduce((acc, curr) => curr - acc, 0);
  const kl = data
    .map((x, i) => {
      if (x.funcL === "kl") {
        return x;
      }
    })
    .filter((f) => f);
  let totalKL = kl
    .map(({ item, jumlahHarga }) => +jumlahHarga)
    .reduce((acc, curr) => curr + acc, 0);

  const kjp = data
    .map((x, i) => {
      if (x.funcL === "kjp") {
        return x;
      }
    })
    .filter((f) => f);
  let totalKJP = kjp
    .map(({ item, jumlahHarga }) => +jumlahHarga)
    .reduce((acc, curr) => curr + acc, 0);
  const ekuitas = data
    .map((x, i) => {
      if (x.funcL === "ekuitas") {
        return x;
      }
    })
    .filter((f) => f);
  let totalEKUITAS = ekuitas
    .map(({ item, jumlahHarga }) => +jumlahHarga)
    .reduce((acc, curr) => curr + acc, 0);

  let TOTAL_JUMLAH_ASET = totalAL + totalATL + totalAT;
  let TOTAL_KNE = totalKL + totalKJP + totalEKUITAS;
  const NData = {
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
  };
  return NData;
};
