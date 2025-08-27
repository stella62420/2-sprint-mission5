export interface AuthUserDTO {
  id: number;
  email: string;
  nickname: string;
  image?: string | null;
  createdAt: Date;
}

export interface AuthTokensDTO {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterResponseDTO extends AuthTokensDTO {
  user: AuthUserDTO;
}

export interface LoginResponseDTO extends AuthTokensDTO {
  user: AuthUserDTO;
}

export interface RefreshResponseDTO extends AuthTokensDTO {
  user: AuthUserDTO;
}
