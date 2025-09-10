import { object, string, number, optional, size, partial, coerce, enums } from 'superstruct';

export const IdParamsStruct = object({
  id: coerce(number(), string(), (v) => parseInt(v, 10)),
});

export const CreateArticleBodyStruct = object({
  title: size(string(), 1, 200),
  content: size(string(), 1, 10000),
  image: optional(string()),
});

export const UpdateArticleBodyStruct = partial(CreateArticleBodyStruct);

export const ListArticlesQueryStruct = object({
  q:        optional(size(string(), 0, 200)),
  keyword:  optional(size(string(), 0, 200)),

  orderBy:  optional(enums(['latest', 'oldest', 'liked'] as const)),

  page:     optional(coerce(number(), string(), (v) => Number(v))),
  pageSize: optional(coerce(number(), string(), (v) => Number(v))),
});

