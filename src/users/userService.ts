import { UserRepository } from './userRepository';
import type { CreateUserRequestDTO, UpdateUserRequestDTO } from './dtos/user.request.dto';
import type { UserResponseDTO } from './dtos/user.response.dto';
import NotFoundError from '../lib/errors/NotFoundError';

export default class UserService {
  constructor(private repo: UserRepository) {}

  async create(dto: CreateUserRequestDTO): Promise<UserResponseDTO> {
    const user = await this.repo.create(dto);
    return this.toDTO(user);
  }

  async getById(id: number): Promise<UserResponseDTO> {
    const user = await this.repo.findById(id);
    if (!user) throw new NotFoundError('User not found');
    return this.toDTO(user);
  }

  async update(id: number, patch: UpdateUserRequestDTO): Promise<UserResponseDTO> {
    const user = await this.repo.update(id, patch);
    return this.toDTO(user);
  }

  async remove(id: number) {
    await this.repo.delete(id);
  }

  private toDTO(user: any): UserResponseDTO {
    return {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      image: user.image,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
