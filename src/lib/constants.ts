import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const PORT = Number(process.env.PORT || 4000);
export const STATIC_PATH = path.resolve(process.cwd(), 'public');
export const PUBLIC_PATH = STATIC_PATH;
export const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h'; 
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'your_refresh_token_secret';
export const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || '7d';
