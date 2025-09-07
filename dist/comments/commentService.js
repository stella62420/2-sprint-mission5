"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NotFoundError_1 = __importDefault(require("../lib/errors/NotFoundError"));
const ForbiddenError_1 = __importDefault(require("../lib/errors/ForbiddenError"));
const notificationService_1 = __importDefault(require("../notifications/notificationService"));
const notificationRepository_1 = require("../notifications/notificationRepository");
const notificationService = new notificationService_1.default(new notificationRepository_1.NotificationRepository());
class CommentService {
    constructor(repo) {
        this.repo = repo;
    }
    toDTO(c) {
        return {
            id: c.id,
            content: c.content,
            user: { id: c.user?.id ?? c.userId, nickname: c.user?.nickname ?? '' },
            productId: c.productId ?? null,
            articleId: c.articleId ?? null,
            createdAt: c.createdAt,
        };
    }
    async get(id) {
        const c = await this.repo.findById(id);
        if (!c)
            throw new NotFoundError_1.default('Comment not found');
        return this.toDTO(c);
    }
    async list(q) {
        const { items, total } = await this.repo.list(q);
        return {
            items: items.map((c) => this.toDTO(c)),
            page: q.page,
            pageSize: q.pageSize,
            total,
        };
    }
    async create(userId, dto) {
        const ok = await this.repo.targetExists(dto.targetType, dto.targetId);
        if (!ok) {
            throw new NotFoundError_1.default(dto.targetType === 'product' ? 'Product not found' : 'Article not found');
        }
        const created = await this.repo.create({ ...dto, userId });
        if (dto.targetType === 'article') {
            const article = await this.repo.findArticleAuthor(dto.targetId);
            if (article && article.authorId !== userId) {
                await notificationService.create({
                    userId: article.authorId,
                    message: `게시글 "${article.title}"에 새로운 댓글이 달렸습니다.`,
                });
            }
        }
        else if (dto.targetType === 'product') {
            const product = await this.repo.findProductSeller(dto.targetId);
            if (product && product.userId !== userId) {
                await notificationService.create({
                    userId: product.userId,
                    message: `상품 "${product.title}"에 새로운 댓글이 달렸습니다.`,
                });
            }
        }
        return this.toDTO(created);
    }
    async update(id, userId, patch) {
        const prev = await this.repo.findById(id);
        if (!prev)
            throw new NotFoundError_1.default('Comment not found');
        if (prev.userId !== userId)
            throw new ForbiddenError_1.default('Forbidden');
        const updated = await this.repo.update(id, patch);
        return this.toDTO(updated);
    }
    async remove(id, userId) {
        const prev = await this.repo.findById(id);
        if (!prev)
            throw new NotFoundError_1.default('Comment not found');
        if (prev.userId !== userId)
            throw new ForbiddenError_1.default('Forbidden');
        await this.repo.delete(id);
    }
}
exports.default = CommentService;
