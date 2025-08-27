export interface CreateNotificationRequestDTO {
  userId: number;
  message: string;
}

export interface UpdateNotificationReadRequestDTO {
  isRead: boolean;
}

export interface ListNotificationsQueryDTO {
  page: number;
  pageSize: number;
}
