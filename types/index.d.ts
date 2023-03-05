export type lessons1 = {
  id: string;
  userID: string;
  lessonTitle: string;
  recording: string;
  notes: string | null;
  homework: string | null;
  time: string | undefined;
  exercises: {
    id: string;
    name: string;
    desc: string;
  }[];
};
