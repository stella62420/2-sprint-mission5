import { object, string, number, optional, coerce, union, literal } from 'superstruct';

const toNum = (v: any, def: number) => (v == null || v === '' ? def : Number(v));

export const CreateArticleBodyStruct = object({
  title: string(),
  content: string(),
  image: optional(string()),
});

export const UpdateArticleBodyStruct = object({
  title: optional(string()),
  content: optional(string()),
  image: optional(string()),
});

export const ListArticlesQueryStruct = object({
  page: coerce(number(), string(), v => toNum(v, 1)),
  pageSize: coerce(number(), string(), v => toNum(v, 10)),
  keyword: optional(coerce(string(), string(), v => (v ?? '').trim())),
  orderBy: optional(union([literal('latest'), literal('oldest')])),
});

export const IdParamsStruct = object({
  id: coerce(number(), string(), v => Number(v)),
});
