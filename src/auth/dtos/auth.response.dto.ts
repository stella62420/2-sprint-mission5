export interface AuthUserDTO {
  id: number;
  email?: string;
  nickname?: string;
}

export interface LoginServiceResult {
  user?: AuthUserDTO | null;
  accessToken?: string;
  refreshToken?: string;
  [key: string]: unknown;
}

export interface RegisterResponseDTO {
  user: AuthUserDTO;
  token: string;
}

export interface LoginResponseDTO {
  user: AuthUserDTO;
  token: string;
  refreshToken?: string;
}

export interface RefreshResponseDTO {
  token: string;
}
