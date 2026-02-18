// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: process.env.POSTGRES_PRISMA_URL, // <-- your secret lives here
      },
    },
    log: ['query', 'info', 'warn', 'error'], // optional
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;
