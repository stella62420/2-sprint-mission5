import { object, string, size, pattern } from 'superstruct';

export const EmailStruct = pattern(string(), /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
export const PasswordStruct = size(string(), 8, 200);

export const RegisterBodyStruct = object({
  email: EmailStruct,
  password: PasswordStruct,
  nickname: size(string(), 1, 50),
});

export const LoginBodyStruct = object({
  email: EmailStruct,
  password: PasswordStruct,
});

export const RefreshBodyStruct = object({
  refreshToken: string(),
});
