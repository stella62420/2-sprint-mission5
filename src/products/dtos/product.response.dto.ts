export interface ProductSummaryDTO {
  id: number;
  title: string;
  price: number;
  images: string[];
  category?: string | null;
  createdAt: Date;
  likes: number;
}

export interface ProductDetailDTO extends ProductSummaryDTO {
  description: string;
  liked: boolean;
  seller: { id: number; nickname: string };
}

export interface Paginated<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
}
