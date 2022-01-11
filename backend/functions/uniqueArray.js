exports.unique = (arr) => {
  const fil = arr.map((x) => x.persediaanName);
  let result = [];

  for (let str of fil) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }

  return result;
};
exports.uniqueK = (arr) => {
  const fil = arr.map((x) => x.kategori);
  let result = [];

  for (let str of fil) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }

  return result;
};
