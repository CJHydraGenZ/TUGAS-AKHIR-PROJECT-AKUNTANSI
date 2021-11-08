exports.kuantitas = (arr) => {
  const total = arr
    .map((x) => x.kuantitas)
    .reduce((acc, curr) => curr + acc, 0);

  return total;
};
