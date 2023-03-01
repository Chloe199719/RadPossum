import pb from "../pocketbase";

export default async function checkCode(code: string) {
  try {
    const checkCode = await pb.collection("codes").getList(1, 50, {
      filter: `code = "${code}" && isValid = true`,
      API_KEY: process.env.API_KEY,
    });

    if (checkCode.totalItems === 0) {
      throw new Error(`Code Not valid`);
    }
    if (checkCode.items[0]?.used) {
      throw new Error(`Code Already Used`);
    }
    return Promise.resolve({
      id: checkCode.items[0].id,
      time: checkCode.items[0].time,
      locale: checkCode.items[0].public_or_private,
    });
  } catch (error: any) {
    return Promise.reject({ status: 400, message: error.message });
  }
}
