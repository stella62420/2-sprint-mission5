import { PrismaClient, Prisma } from '@prisma/client';

const isProd = process.env.NODE_ENV === 'production';

const logs: (Prisma.LogLevel | Prisma.LogDefinition)[] | undefined =
  process.env.NODE_ENV === 'test' ? undefined : ['warn', 'error'];

type GlobalWithPrisma = typeof globalThis & { __PRISMA__?: PrismaClient };
const g = global as GlobalWithPrisma;

export const prisma =
  g.__PRISMA__ ??
  new PrismaClient({
    log: logs,
  });

if (!isProd) g.__PRISMA__ = prisma;

export default prisma;

export async function disconnect() {
  await prisma.$disconnect();
}
