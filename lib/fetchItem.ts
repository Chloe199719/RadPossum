import pb from "./pocketbase";

const fetchItem = async function (req: string, day: number) {
  const data = await pb
    .collection(`shop_items`)
    .getOne(req, { API_KEY: process.env.API_KEY });
  if (day === 6) {
    return {
      priceID: data.saturdayPriceID,
      locale: data.locale,
      time: data.time,
    };
  }
  return { priceID: data.normalPriceID, locale: data.locale, time: data.time };
};

export default fetchItem;
