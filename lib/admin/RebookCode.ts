import { LessonCode } from "@/types";
import Hash from "../hashgenerator";
import prismaClient from "../prisma/prismaClient";

export default async function rebookCode({
  public_or_private,
  time,
  userID,
}: LessonCode) {
  const hash: string = Hash();
  try {
    const data = await prismaClient.lessonCodes.create({
      data: {
        code: hash,
        public_or_private: public_or_private,
        time: time,
        userID: userID,
      },
    });
    return data;
  } catch (error) {
    return Promise.reject({ message: `Could not Create Lesson Code` });
  }
}
