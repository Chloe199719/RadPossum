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

export type comment = {
  id: string;
  message: string;
  parentID: string;
  updateAT: string;
  createdAT: string;
  postID: string;
  edited: boolean;
  user: {
    name: string;
    image: string;
  };
  userID: string;
};
