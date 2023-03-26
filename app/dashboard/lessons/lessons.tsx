import { lessons } from "@prisma/client";
import React from "react";
import Lesson from "../Lesson";

type Props = {
  lesson: lessons[] | null;
};
function Lessons({ lesson }: Props) {
  const Test = function () {
    if (lesson === null || lesson.length === 0)
      return <p className=" text-center">No Lesson Taken yet </p>;
    return (
      <>
        {lesson.map((data) => {
          return <Lesson key={data.id} lessonData={data} />;
        })}
      </>
    );
  };
  return (
    <div className="flex flex-col justify-start md:items-center gap-6 flex-1 px-10 w-full">
      <div className="  flex justify-center">
        <h2 className="text-5xl"> Lessons</h2>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 w-full overflow-y-auto ">
        <h3 className=" text-3xl">Lessons History</h3>

        <Test />

        {/* <h3>UpComing Bookings</h3> */}
      </div>{" "}
      {/* {userInfo ? null : router.push(`/`)} */}
    </div>
  );
}
export default Lessons;
