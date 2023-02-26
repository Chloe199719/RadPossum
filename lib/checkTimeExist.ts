const checkTimeExist = async function (hour: string, time: Date) {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_DB_URL
    }api/collections/booking/records/?filter=(date= "${time.getUTCFullYear()}-${
      time.getUTCMonth() + 1
    }-${time.getUTCDate()}")`,
    { cache: "default" }
  );
  const date = await res.json();
  const check = date.items.some((item: any) => {
    return item.hour.includes(hour);
  });
  return check;
};

export default checkTimeExist;
