import type { Request, Response } from 'express';
import { create } from 'superstruct';
import UserService from './userService';
import { UserRepository } from './userRepository';
import { CreateUserBodyStruct, UpdateUserBodyStruct } from './user.struct';
import type { CreateUserRequestDTO, UpdateUserRequestDTO } from './dtos/user.request.dto';

const service = new UserService(new UserRepository());

export async function createUser(req: Request, res: Response) {
  const dto = create(req.body, CreateUserBodyStruct) as CreateUserRequestDTO;
  res.status(201).json(await service.create(dto));
}

export async function getUser(req: Request, res: Response) {
  const id = Number(req.params.id);
  res.json(await service.getById(id));
}

export async function updateUser(req: Request, res: Response) {
  const id = Number(req.params.id);
  const patch = create(req.body ?? {}, UpdateUserBodyStruct) as UpdateUserRequestDTO;
  res.json(await service.update(id, patch));
}

export async function deleteUser(req: Request, res: Response) {
  const id = Number(req.params.id);
  await service.remove(id);
  res.status(204).send();
}
