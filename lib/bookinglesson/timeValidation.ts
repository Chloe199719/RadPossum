import generateTime from "./generatetime";

const checkTimeExist = async function (hour: string, time: Date) {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_DB_URL
    }api/collections/booking/records/?filter=(date= "${generateTime(time)}")`,
    { cache: "default" }
  );
  const date = await res.json();
  const check = date.items.some((item: any) => {
    return item.hour.includes(hour);
  });
  if (!check) {
    return Promise.resolve(true);
  } else {
    return Promise.reject({
      status: 400,
      message: `Time Already Booked Try Again`,
    });
  }
};

export default checkTimeExist;
