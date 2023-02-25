import pb from "./pocketbase";

const fetchProdId = async function () {
  const data = await pb
    .collection(`shop_items`)
    .getFullList(200, { APIKEY: "412312312" });
  const pushArrayy: Array<string> = [];
  data.forEach((e) => {
    pushArrayy.push(e.prodID);
  });
  return pushArrayy;
};

export default fetchProdId;
