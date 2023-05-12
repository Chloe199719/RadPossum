// import { PrismaClient } from "@prisma/client";
// const prismaClient = new PrismaClient();

// export default prismaClient;

import { PrismaClient } from "@prisma/client";

let prismaClient: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prismaClient = new PrismaClient();
} else {
  // @ts-ignore
  if (!global.prisma) {
    // @ts-ignore
    global.prisma = new PrismaClient();
  }
  // @ts-ignore
  prismaClient = global.prisma;
}

export default prismaClient;
