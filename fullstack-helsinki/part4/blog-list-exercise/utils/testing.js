const palindrome = str => {
  return str
    .split("")
    .reverse()
    .join("");
};

const mean = arr => {
  const sumAll = arr.reduce((accum, el) => {
    return accum + el;
  }, 0);
  return arr.length === 0 ? 0 : sumAll / arr.length;
};

module.exports = { palindrome, mean };
