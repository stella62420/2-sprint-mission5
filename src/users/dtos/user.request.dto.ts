export interface CreateUserRequestDTO {
  email: string;
  nickname: string;
  password: string;
  image?: string | null;
}

export interface UpdateUserRequestDTO {
  nickname?: string;
  password?: string;
  image?: string | null;
}
