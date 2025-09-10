export interface CommentDTO {
  id: number;
  content: string;
  user: { id: number; nickname: string };
  productId?: number | null;
  articleId?: number | null;
  createdAt: Date;
}

export interface Paginated<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
}
