import pb from "./pocketbase";

const fetchItem = async function (req: string, day: number) {
  const data = await pb
    .collection(`shop_items`)
    .getOne(req, { APIKEY: "412312312" });
  if (day === 6) {
    return { priceID: data.saturdayPriceID, locale: data.locale };
  }
  return { priceID: data.normalPriceID, locale: data.locale };
};

export default fetchItem;
