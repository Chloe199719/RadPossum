import { booking, User } from "@prisma/client";

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

export interface Lesson {
  title: string;
  recording: string;
  notes: string;
  homework: string;
}

export interface LessonData {
  data: Lesson;
  booking: Booking;
}

export interface createLesson {
  user: string;
  title: string;
  time: string;
  recording: string;
  notes: string;
  homework: string;
}

export interface EmailLesson {
  email: string;
  title: string;
  time: string;
  recording: string;
  notes: string;
  homework: string;
}

export interface CancelData {
  reason: string;
}
export interface CancelBooking {
  data: CancelData;
  booking: Booking;
}

export interface LessonCode {
  public_or_private: string;
  time: string;
  userID: string;
}

export interface emailCodes {
  code: string;
  reason: string;
  oldBooking: booking;
}

export interface PostForm {
  title: string;
}

export interface PostMutation {
  formData: PostForm;
  message: string;
}

export interface CreatePost {
  title: string;
  content: string;
  userID: string;
}

export interface Post {
  id: string;
  title: string;
  message: string;
  userID: string;
  createdAT: Date | number;
  updatedAT: Date | number;
}

export interface EditPostSubmit {
  title: string;
  message: string;
  e: React.FormEvent<HTMLFormElement>;
  postID: string;
}

export interface EditPost {
  title: string;
  content: string;
  id: string;
}
export interface Message {
  id: string;
  message: string;
  Subject: string;
  email: string;
  name: string;
  discordID: string;
  createdAt: number;
  pronouns: string | null;
  readSolved: boolean;
}
export interface MessageSolved {
  id: string;
  readSolved: boolean;
}

export interface FormHero {
  higlightText: string;
  titleFirst: string;
  titleSec: string;
  mainText: string;
}

export interface FormAbout {
  id0: string;
  id1: string;
  about0: string;
  about1: string;
}

export interface FormItem {
  id: string;
  question: string;
  answer: string;
}
export interface FormQA {
  question: string;
  answer: string;
}

export interface FormSocialEdit {
  id: string;
  name: string;
  socialmedia_url: string;
}

export interface FormSocial {
  name: string;
  socialmedia_url: string;
}

export interface SocialMediaShort {
  id: string;
  name: string;
  socialmedia_url: string;
}
export interface FormSocialCreate {
  name: string;
  socialmedia_url: string;
}

export interface FormPrice {
  id: string;
  price_saturday: string;
  price_standard: string;
}

export interface hourForm {
  hour: number;
}

export interface BlockBooking {
  selectedDate: Number;
}

export interface ShopItem {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  privacy: string;
  duration: string;
}
