"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductList = getProductList;
exports.getProductDetail = getProductDetail;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.removeProduct = removeProduct;
exports.addProductLike = addProductLike;
exports.removeProductLike = removeProductLike;
const productService_1 = __importDefault(require("./productService"));
const productRepository_1 = require("./productRepository");
const service = new productService_1.default(new productRepository_1.PrismaProductRepository());
async function getProductList(req, res, next) {
    try {
        const userId = req.user?.id;
        const query = {
            page: req.query.page ? Number(req.query.page) : 1,
            pageSize: req.query.pageSize ? Number(req.query.pageSize) : 20,
            keyword: req.query.keyword ? String(req.query.keyword) : undefined,
        };
        const data = await service.list(query, userId);
        res.status(200).json(data);
    }
    catch (e) {
        next(e);
    }
}
async function getProductDetail(req, res, next) {
    try {
        const id = Number(req.params.id);
        const data = await service.getById(id);
        res.status(200).json(data);
    }
    catch (e) {
        next(e);
    }
}
async function createProduct(req, res, next) {
    try {
        const userId = req.user.id;
        const dto = req.body;
        const created = await service.create(dto, userId);
        res.status(201).json(created);
    }
    catch (e) {
        next(e);
    }
}
async function updateProduct(req, res, next) {
    try {
        const id = Number(req.params.id);
        const userId = req.user.id;
        const dto = req.body;
        const updated = await service.update(id, userId, dto);
        res.status(200).json(updated);
    }
    catch (e) {
        next(e);
    }
}
async function removeProduct(req, res, next) {
    try {
        const id = Number(req.params.id);
        const userId = req.user.id;
        await service.remove(id, userId);
        res.status(204).end();
    }
    catch (e) {
        next(e);
    }
}
async function addProductLike(req, res, next) {
    try {
        const id = Number(req.params.id);
        const userId = req.user.id;
        const result = await service.addLike(id, userId);
        res.status(200).json(result);
    }
    catch (e) {
        next(e);
    }
}
async function removeProductLike(req, res, next) {
    try {
        const id = Number(req.params.id);
        const userId = req.user.id;
        const result = await service.removeLike(id, userId);
        res.status(200).json(result);
    }
    catch (e) {
        next(e);
    }
}
