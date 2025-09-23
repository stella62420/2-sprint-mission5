import { object, string, optional } from 'superstruct';

export const CreateUserBodyStruct = object({
  email: string(),
  nickname: string(),
  password: string(),
  image: optional(string()),
});

export const UpdateUserBodyStruct = object({
  nickname: optional(string()),
  password: optional(string()),
  image: optional(string()),
});
