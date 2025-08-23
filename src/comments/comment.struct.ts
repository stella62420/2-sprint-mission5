import { object, string, number, optional, coerce, union, literal } from 'superstruct';

const toNum = (v: any, def: number) => (v == null || v === '' ? def : Number(v));

export const CreateCommentBodyStruct = object({
  content: string(),
  targetType: optional(union([literal('product'), literal('article')])), // 중첩 라우트면 생략 가능
  targetId:   optional(coerce(number(), string(), v => Number(v))),      // 중첩 라우트면 생략 가능
});

export const UpdateCommentBodyStruct = object({
  content: string(),
});

export const ListCommentsQueryStruct = object({
  page: coerce(number(), string(), v => toNum(v, 1)),
  pageSize: coerce(number(), string(), v => toNum(v, 20)),
  targetType: optional(union([literal('product'), literal('article')])),
  targetId:   optional(coerce(number(), string(), v => Number(v))),
  userId:     optional(coerce(number(), string(), v => Number(v))),
});

export const IdParamsStruct = object({
  id: coerce(number(), string(), v => Number(v)),
});
