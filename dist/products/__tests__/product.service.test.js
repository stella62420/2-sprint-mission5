"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const productService_1 = __importDefault(require("../productService"));
describe('[UNIT] ProductService', () => {
    test('create', async () => {
        const repo = {
            create: globals_1.jest.fn(() => Promise.resolve({
                id: 1,
                title: '테스트',
                price: 1000,
                images: [],
                category: null,
                createdAt: new Date(),
            })),
            countLikes: globals_1.jest.fn(() => Promise.resolve(0)),
        };
        const svc = new productService_1.default(repo);
        const r = await svc.create({
            title: '테스트',
            price: 1000,
            images: [],
            description: '설명',
            authorId: 1,
        });
        expect(r.id).toBe(1);
        expect(repo.create).toHaveBeenCalled();
    });
    test('getById: NotFoundError', async () => {
        const repo = {
            create: globals_1.jest.fn(() => Promise.resolve({ id: 1 })),
            countLikes: globals_1.jest.fn(() => Promise.resolve(0)),
            findById: globals_1.jest.fn(() => Promise.resolve(null)),
        };
        const svc = new productService_1.default(repo);
        await expect(svc.getById(999)).rejects.toThrow();
        expect(repo.findById).toHaveBeenCalledWith(999, undefined);
    });
});
