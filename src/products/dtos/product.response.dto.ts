export interface ProductSummaryDTO {
  id: number;
  title: string;
  price: number;
  images: string[];
  category: string | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  likes: number;
}

export interface ProductDetailDTO extends ProductSummaryDTO {
  seller: { id: number; nickname: string };
}

export type Paginated<T> = {
  items: T[];
  total: number;
};
