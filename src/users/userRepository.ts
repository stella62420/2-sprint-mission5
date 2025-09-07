import prismaClient from '../lib/prismaClient';
import type { CreateUserRequestDTO, UpdateUserRequestDTO } from './dtos/user.request.dto';

export class UserRepository {
  async create(data: CreateUserRequestDTO) {
    return prismaClient.user.create({ data });
  }

  async findById(id: number) {
    return prismaClient.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return prismaClient.user.findUnique({ where: { email } });
  }

  async update(id: number, patch: UpdateUserRequestDTO) {
    return prismaClient.user.update({ where: { id }, data: patch });
  }

  async delete(id: number) {
    await prismaClient.user.delete({ where: { id } });
  }
}
