"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArticleList = getArticleList;
exports.getArticleDetail = getArticleDetail;
exports.createArticle = createArticle;
exports.updateArticle = updateArticle;
exports.removeArticle = removeArticle;
const articleRepository_1 = __importDefault(require("./articleRepository"));
const articleService_1 = __importDefault(require("./articleService"));
const NotFoundError_1 = __importDefault(require("../lib/errors/NotFoundError"));
const repo = new articleRepository_1.default();
const service = new articleService_1.default(repo);
async function getArticleList(req, res, next) {
    try {
        const page = req.query.page ? Number(req.query.page) : 1;
        const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 20;
        const items = await repo.list(page, pageSize);
        res.status(200).json(items);
    }
    catch (e) {
        next(e);
    }
}
async function getArticleDetail(req, res, next) {
    try {
        const id = Number(req.params.id);
        const one = await repo.findById(id);
        if (!one)
            throw new NotFoundError_1.default(`article ${id} not found`);
        res.status(200).json(one);
    }
    catch (e) {
        next(e);
    }
}
async function createArticle(req, res, next) {
    try {
        const userId = req.user.id;
        const { title, content, image } = req.body ?? {};
        if (!title || !content || typeof title !== 'string' || typeof content !== 'string') {
            res.status(400).json({ message: 'title and content are required' });
            return;
        }
        const created = await repo.create(userId, { title, content, image });
        res.status(201).json(created);
    }
    catch (e) {
        next(e);
    }
}
async function updateArticle(req, res, next) {
    try {
        const id = Number(req.params.id);
        const userId = req.user.id;
        const { title, content, image } = req.body ?? {};
        if (typeof title === 'undefined' && typeof content === 'undefined' && typeof image === 'undefined') {
            res.status(400).json({ message: 'no fields' });
            return;
        }
        const current = await repo.findById(id);
        if (!current)
            throw new NotFoundError_1.default(`article ${id} not found`);
        if (current.author?.id !== userId) {
            res.status(403).json({ message: 'forbidden' });
            return;
        }
        const updated = await repo.update(id, { title, content, image });
        res.status(200).json(updated);
    }
    catch (e) {
        next(e);
    }
}
async function removeArticle(req, res, next) {
    try {
        const id = Number(req.params.id);
        const userId = req.user.id;
        const current = await repo.findById(id);
        if (!current)
            throw new NotFoundError_1.default(`article ${id} not found`);
        if (current.author?.id !== userId) {
            res.status(403).json({ message: 'forbidden' });
            return;
        }
        await repo.remove(id);
        res.status(204).end();
    }
    catch (e) {
        next(e);
    }
}
