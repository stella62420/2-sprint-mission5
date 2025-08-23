import type { User } from '@prisma/client';
import 'express-serve-static-core';

declare module 'express-serve-static-core' {
  interface Request {
    user?: (Pick<User, 'id' | 'email' | 'nickname'> & {
      image?: string | null;
    }) | null;
  }
}

export {};
