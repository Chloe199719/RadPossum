import prismaClient from "@/lib/prisma/prismaClient";
import LessonEditingForm from "./LessonEditingForm";

type Props = {
  params: {
    id: string;
  };
};
const getLessonID = async function (id: string) {
  try {
    const lesson = await prismaClient.lessons.findUnique({
      where: {
        id: id,
      },
      include: {
        User: true,
      },
    });
    return lesson;
  } catch (error) {
    return null;
  }
};

async function page({ params }: Props) {
  const lesson = await getLessonID(params.id);
  if (!lesson)
    return (
      <div>
        <h1 className="text-5xl uppercase">Lesson not found</h1>
      </div>
    );
  return (
    <div className="w-full space-y-6">
      <h2 className="text-3xl text-center">
        Lesson Editing : {lesson.lessonTitle}
      </h2>
      <LessonEditingForm lesson={lesson} />
    </div>
  );
}
export default page;
