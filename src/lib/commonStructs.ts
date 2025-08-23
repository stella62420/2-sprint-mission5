import {
  object, number, string, optional, coerce, union, literal,
} from 'superstruct';

const toNum = (v: any, def: number) =>
  v == null || v === '' ? def : Number(v);

export const IdParamsStruct = object({
  id: coerce(number(), string(), (v) => Number(v)),
});

export const PageParamsStruct = object({
  page: coerce(number(), string(), (v) => toNum(v, 1)),
  pageSize: coerce(number(), string(), (v) => toNum(v, 10)),
  keyword: optional(coerce(string(), string(), (v) => (v ?? '').trim())),
  orderBy: optional(
    union([
      literal('latest'),
      literal('oldest'),
      literal('priceAsc'),
      literal('priceDesc'),
    ])
  ),
});

export const CursorParamsStruct = object({
  cursor: optional(coerce(number(), string(), (v) => Number(v))),
  take: coerce(number(), string(), (v) => toNum(v, 20)),
  limit: optional(coerce(number(), string(), (v) => Number(v))),
});
