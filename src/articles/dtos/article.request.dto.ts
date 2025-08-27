export type ArticleOrderBy = 'latest' | 'oldest';

export interface CreateArticleRequestDTO {
  title: string;
  content: string;
  image?: string;
}

export interface UpdateArticleRequestDTO {
  title?: string;
  content?: string;
  image?: string | null;
}

export interface ListArticlesQueryDTO {
  page: number;
  pageSize: number;
  keyword?: string;
  orderBy?: ArticleOrderBy;
}
