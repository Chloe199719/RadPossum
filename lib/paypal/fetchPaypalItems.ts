import pb from "../pocketbase";

const fetchPaypal = async function (id: string) {
  try {
    const data = pb
      .collection(`paypal_items`)
      .getOne(id, { APIKEY: "412312312" });
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject({
      status: 500,
      message: `There was Error in our Server`,
    });
  }
};

export default fetchPaypal;
