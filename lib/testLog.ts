const test = function () {
  const cur = new Date().getTime();
  const divided = Math.round(cur / 1000);
  const min5 = new Date((divided + 5 * 60) * 1000);
  console.log(min5.toLocaleString());
};

export default test;
