import { object, string, number, array, optional, coerce, union, literal } from 'superstruct';

const toNum = (v: any, def: number) => (v == null || v === '' ? def : Number(v));

export const CreateProductBodyStruct = object({
  title: string(),
  description: optional(string()),
  price: number(),
  tags: optional(array(string())),
  images: optional(array(string())),
  manufacturer: optional(string()),
});

export const UpdateProductBodyStruct = object({
  title: optional(string()),
  description: optional(string()),
  price: optional(number()),
  tags: optional(array(string())),
  images: optional(array(string())),
  manufacturer: optional(string()),
});

export const ListProductsQueryStruct = object({
  page: coerce(number(), string(), v => toNum(v, 1)),
  pageSize: coerce(number(), string(), v => toNum(v, 12)),
  keyword: optional(coerce(string(), string(), v => (v ?? '').trim())),
  orderBy: optional(union([literal('latest'), literal('oldest'), literal('priceAsc'), literal('priceDesc')])),
});

export const IdParamsStruct = object({
  id: coerce(number(), string(), v => Number(v)),
});
