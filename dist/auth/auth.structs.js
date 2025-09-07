"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshBodyStruct = exports.LoginBodyStruct = exports.RegisterBodyStruct = exports.PasswordStruct = exports.EmailStruct = void 0;
const superstruct_1 = require("superstruct");
exports.EmailStruct = (0, superstruct_1.pattern)((0, superstruct_1.string)(), /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
exports.PasswordStruct = (0, superstruct_1.size)((0, superstruct_1.string)(), 8, 200);
exports.RegisterBodyStruct = (0, superstruct_1.object)({
    email: exports.EmailStruct,
    password: exports.PasswordStruct,
    nickname: (0, superstruct_1.size)((0, superstruct_1.string)(), 1, 50),
});
exports.LoginBodyStruct = (0, superstruct_1.object)({
    email: exports.EmailStruct,
    password: exports.PasswordStruct,
});
exports.RefreshBodyStruct = (0, superstruct_1.object)({
    refreshToken: (0, superstruct_1.string)(),
});
