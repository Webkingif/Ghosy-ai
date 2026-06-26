import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const databaseUrl = process.env.DATABASE_URL || "";

declare global {
  var prisma: PrismaClient | undefined;
}

let prismaInstance: PrismaClient;

if (databaseUrl.startsWith("prisma+postgres://")) {
  if (process.env.NODE_ENV === "production") {
    prismaInstance = new PrismaClient();
  } else {
    if (!global.prisma) {
      global.prisma = new PrismaClient();
    }
    prismaInstance = global.prisma;
  }
} else {
  if (process.env.NODE_ENV === "production") {
    const pool = new Pool({ connectionString: databaseUrl });
    const adapter = new PrismaPg(pool);
    prismaInstance = new PrismaClient({ adapter });
  } else {
    if (!global.prisma) {
      const pool = new Pool({ connectionString: databaseUrl });
      const adapter = new PrismaPg(pool);
      global.prisma = new PrismaClient({ adapter });
    }
    prismaInstance = global.prisma;
  }
}

export const prisma = prismaInstance;
export default prisma;
