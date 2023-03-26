import { createLesson } from "@/types";
import prismaClient from "../prisma/prismaClient";

export default async function createLessonData(data: createLesson) {
  try {
    const lesson = await prismaClient.lessons.create({
      data: {
        userID: data.user,
        lessonTitle: data.title,
        recording: data.recording,
        notes: data.notes,
        homework: data.homework,
        time: data.time,
      },
    });
    return lesson;
  } catch (error) {
    return Promise.reject({ message: `Could not Create Lesson` });
  }
}
