export type ProductOrderBy = 'latest' | 'oldest' | 'priceAsc' | 'priceDesc';

export interface CreateProductRequestDTO {
  title: string;
  description: string;
  price: number;
  category?: string;
  images?: string[];
}

export interface UpdateProductRequestDTO {
  title?: string;
  description?: string;
  price?: number;
  category?: string;
  images?: string[];
}

export interface ListProductsQueryDTO {
  page: number;
  pageSize: number;
  keyword?: string;
  orderBy?: ProductOrderBy;
}
