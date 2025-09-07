"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const prismaClient_1 = __importDefault(require("../prismaClient"));
exports.db = prismaClient_1.default;
exports.default = exports.db;
