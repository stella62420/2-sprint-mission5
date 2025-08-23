import { object, number, string, boolean } from 'superstruct';

export const CreateNotificationBodyStruct = object({
  userId: number(),
  message: string(),
});

export const UpdateNotificationReadStruct = object({
  isRead: boolean(),
});
