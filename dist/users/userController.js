"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
const superstruct_1 = require("superstruct");
const userService_1 = __importDefault(require("./userService"));
const userRepository_1 = require("./userRepository");
const user_struct_1 = require("./user.struct");
const service = new userService_1.default(new userRepository_1.UserRepository());
async function createUser(req, res) {
    const dto = (0, superstruct_1.create)(req.body, user_struct_1.CreateUserBodyStruct);
    res.status(201).json(await service.create(dto));
}
async function getUser(req, res) {
    const id = Number(req.params.id);
    res.json(await service.getById(id));
}
async function updateUser(req, res) {
    const id = Number(req.params.id);
    const patch = (0, superstruct_1.create)(req.body ?? {}, user_struct_1.UpdateUserBodyStruct);
    res.json(await service.update(id, patch));
}
async function deleteUser(req, res) {
    const id = Number(req.params.id);
    await service.remove(id);
    res.status(204).send();
}
