import {
  object,
  string,
  number,
  array,
  optional,
  coerce,
  enums,
} from 'superstruct';

export const ListProductsQueryStruct = object({
  q: optional(string()),
  page: optional(coerce(number(), string(), (v) => Number(v))),
  pageSize: optional(coerce(number(), string(), (v) => Number(v))),
  orderBy: optional(enums(['latest', 'popular', 'priceAsc', 'priceDesc'] as const)),
  category: optional(string()),
});

export const CreateProductBodyStruct = object({
  title: string(),
  price: coerce(number(), string(), (v) => Number(v)),
  images: optional(array(string())),
  category: optional(string()),
  description: optional(string()),
});

export const UpdateProductBodyStruct = object({
  title: optional(string()),
  price: optional(coerce(number(), string(), (v) => Number(v))),
  images: optional(array(string())),
  category: optional(string()),
  description: optional(string()),
});
