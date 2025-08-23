export type CommentTarget = 'product' | 'article';

export interface CreateCommentRequestDTO {
  content: string;
  targetType: CommentTarget;
  targetId: number;
}

export interface UpdateCommentRequestDTO {
  content: string;
}

export interface ListCommentsQueryDTO {
  page: number;
  pageSize: number;
  // optional filters
  targetType?: CommentTarget;
  targetId?: number;
  userId?: number;
}
