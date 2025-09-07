"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserBodyStruct = exports.CreateUserBodyStruct = void 0;
const superstruct_1 = require("superstruct");
exports.CreateUserBodyStruct = (0, superstruct_1.object)({
    email: (0, superstruct_1.string)(),
    nickname: (0, superstruct_1.string)(),
    password: (0, superstruct_1.string)(),
    image: (0, superstruct_1.optional)((0, superstruct_1.string)()),
});
exports.UpdateUserBodyStruct = (0, superstruct_1.object)({
    nickname: (0, superstruct_1.optional)((0, superstruct_1.string)()),
    password: (0, superstruct_1.optional)((0, superstruct_1.string)()),
    image: (0, superstruct_1.optional)((0, superstruct_1.string)()),
});
