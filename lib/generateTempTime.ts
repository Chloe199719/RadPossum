import pb from "./pocketbase";

const createTempDate = async function (time: Date, body: any) {
  const data = await pb.collection(`booking`).create(
    {
      date: `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`,
      hour: body.bookedHour,
      clientId: body.clientID,
    },
    { API_KEY: process.env.API_KEY } // TODO CHANGE IT TO ENV FILE AND GENERATE A CODE FOR IT
  );
  return data;
};

export default createTempDate;
