import { User } from "@prisma/client";

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
  updatedAT: string;
  createdAT: string;
  postID: string;
  edited: boolean;
  user: {
    name: string;
    image: string;
  };
  userID: string;
  Like: {
    userId: string;
    commentId: string;
    user: {
      name: string;
    };
  }[];
};

export type session = {
  status: "authenticated" | "loading" | "unauthenticated";
  data: {
    user?: {
      name?: string;
      email?: string;
      image?: string;
      id?: string;
    };
  } | null;
};

export interface DiscordData {
  id: string;
  username: string;
  global_name: string | null;
  discriminator: string;
  avatar: string;
  avatar_description: string | null;

  public_flags: number;
  banner: string;
  accent_color: number;
  display_names: string | null;
}

export interface UpcomingBookings {
  id: string;
  time: string;
  transactionID: string | null;
  public_or_private: string;
  userID: string;
  canceled: boolean;
  bookedTime: string;
  discordID: string;
  message: string | null;
  completed: boolean;
  email: string | null;
  discordInfo: DiscordData;
  User: User;
}

export interface Booking {
  id: string;
  time: string;
  transactionID: string | null;
  public_or_private: string;
  userID: string;
  canceled: boolean;
  bookedTime: string;
  discordID: string;
  message: string | null;
  completed: boolean;
  email: string | null;
  User: User;
}

// export interface SendMessage {
//   message: string;
//   subject: string;
// }

export interface SendMessage {
  message: string;
  subject: string;
  email: string;
}
