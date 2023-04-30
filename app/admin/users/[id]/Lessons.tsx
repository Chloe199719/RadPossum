"use client";
import { lessons } from "@prisma/client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import ActionsLessons from "./ActionsLessons";
const Time = dynamic(() => import("./GeTTime"), {
  ssr: false,
});
type Props = { lesson: lessons[] };
function Lessons({ lesson }: Props) {
  const [page, setPage] = useState(1);
  return (
    <div className="flex flex-col w-full gap-3 items-center">
      <div className="overflow-x-auto w-full">
        <table className="table table-compact w-full">
          {/* head */}
          <thead>
            <tr>
              <th>Title</th>
              <th>Recoding</th>
              <th>Notes</th>
              <th>HomeWork</th>
              <th>Date </th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {lesson.map((lesson, index) => {
              if (index >= (page - 1) * 10 && index < page * 10) {
                return (
                  <tr key={lesson.id}>
                    <td>{lesson.lessonTitle}</td>
                    <td>
                      <Link
                        className="link link-hover"
                        href={`${lesson.recording}`}
                      >
                        Recording
                      </Link>
                    </td>
                    <td>{lesson.notes}</td>
                    <td>{lesson.homework}</td>
                    <Time time={lesson.time} />
                    <td className="flex justify-center items-center">
                      <ActionsLessons id={lesson.id} />{" "}
                    </td>
                  </tr>
                );
              } else {
                return null;
              }
            })}
          </tbody>
        </table>
      </div>
      <div className="btn-group ">
        <button
          onClick={() => {
            setPage(page === 1 ? page : page - 1);
          }}
          className="btn"
        >
          «
        </button>
        <button className="btn">Page {page}</button>
        <button
          onClick={() => {
            setPage(lesson.length / 10 > page ? page + 1 : page);
          }}
          className="btn"
        >
          »
        </button>
      </div>
    </div>
  );
}
export default Lessons;
