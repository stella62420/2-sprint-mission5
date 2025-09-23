export interface ArticleSummaryDTO {
  id: number;
  title: string;
  image?: string | null;
  createdAt: Date;
  likes: number;
}

export interface ArticleDetailDTO extends ArticleSummaryDTO {
  content: string;
  user: { id: number; nickname: string };
  liked: boolean;
}

export interface Paginated<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
}
