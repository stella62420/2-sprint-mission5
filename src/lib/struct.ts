import { create as sCreate, type Struct } from 'superstruct';

export function create<T>(value: unknown, schema: Struct<T, any>): T {
  return sCreate(value, schema);
}
