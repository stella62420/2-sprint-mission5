export interface ListProductsQueryDTO {
  q?: string;
  page?: number;
  pageSize?: number;
  orderBy?: 'latest' | 'popular' | 'priceAsc' | 'priceDesc';
  category?: string;
}

export interface CreateProductRequestDTO {
  title: string;
  price: number;
  images?: string[];
  category?: string | null;
  description?: string | null;
}

export interface UpdateProductRequestDTO {
  title?: string;
  price?: number;
  images?: string[];
  category?: string | null;
  description?: string | null;
}
