export interface RegisterRequestDTO {
  email: string;
  password: string;
  nickname: string;
}

export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface RefreshRequestDTO {
  refreshToken: string;
}
