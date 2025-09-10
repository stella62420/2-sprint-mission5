export interface UserResponseDTO {
  id: number;
  email: string;
  nickname: string;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSummaryDTO {
  id: number;
  nickname: string;
  image?: string | null;
}
