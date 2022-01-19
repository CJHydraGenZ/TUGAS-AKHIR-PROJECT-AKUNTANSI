exports.kuantitas = (arr) => {
  const total = arr
    .map((x) => x.kuantitas)
    .reduce((acc, curr) => curr + acc, 0);

  return total;
};
exports.sumTotal = (arr) => {
  const total = arr.map((x) => x.jumlah).reduce((acc, curr) => curr + acc, 0);

  return total;
};

exports.awalS = (arr, name) => {
  return {
    SaldoName: name,
    kuantitas: arr.kuantitas,
    harga: arr.harga,
    jumlah: arr.jumlah,
  };
};
exports.convertArrayReduseObject = (data) => {
  let newObj = {
    data: [],

    total: 0,
    // total: 0,
  };

  data.map((eachObj, i) => {
    let p = 0;

    newObj.data.push({
      persediaanName: eachObj.persediaanName,
      kuantitas: eachObj.kuantitas,
      jumlah: eachObj.jumlah,
    });
    // }
  });

  const obj = {
    data: [
      ...newObj.data
        .reduce((map, obj) => map.set(obj.persediaanName, obj), new Map())
        .values(),
    ],
    total: [
      ...newObj.data
        .reduce((map, obj) => map.set(obj.persediaanName, obj), new Map())
        .values(),
    ]
      .map((x) => +x.jumlah)
      .reduce((a, c) => c + a, 0),
  };
  return obj;
};
