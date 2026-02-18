// prisma.config.ts
import { PrismaClient } from '@prisma/client'

// Create Prisma client normally
export const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'], // optional, helpful for debugging
})
