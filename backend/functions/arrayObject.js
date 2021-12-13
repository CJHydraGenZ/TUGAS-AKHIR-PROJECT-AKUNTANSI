exports.arrayObject = (data) => {
  let newObj = {
    data: [
      {
        persediaanName: "beras_merah",
        jumlah: 0,
      },
      {
        persediaanName: "beras_putih",
        jumlah: 0,
      },
    ],
    total: 0,
  };

  data.map((eachObj) => {
    if (eachObj.persediaanName === "beras_putih") {
      newObj.data[1].jumlah += eachObj.jumlah;
    } else {
      newObj.data[0].jumlah += eachObj.jumlah;
    }
  });

  newObj.total += newObj.data[0].jumlah + newObj.data[1].jumlah;

  return newObj;
};
