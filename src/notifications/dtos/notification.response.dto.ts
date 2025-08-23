export interface NotificationResponseDTO {
  id: number;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

export interface Paginated<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
}
