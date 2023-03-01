import pb from "./pocketbase";

const fetchProdId = async function () {
  const data = await pb
    .collection(`shop_items`)
    .getFullList(200, { API_KEY: process.env.API_KEY });
  const pushArrayy: Array<string> = [];
  data.forEach((e) => {
    pushArrayy.push(e.prodID);
  });
  return pushArrayy;
};

export default fetchProdId;
