"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComment = getComment;
exports.getCommentList = getCommentList;
exports.createComment = createComment;
exports.updateComment = updateComment;
exports.deleteComment = deleteComment;
const superstruct_1 = require("superstruct");
const commentService_1 = __importDefault(require("./commentService"));
const commentRepository_1 = require("./commentRepository");
const comment_struct_1 = require("./comment.struct");
const service = new commentService_1.default(new commentRepository_1.PrismaCommentRepository());
function inferTargetFromPath(req) {
    const path = req.baseUrl + req.path;
    const m1 = path.match(/\/products\/(\d+)\/comments/);
    if (m1)
        return { targetType: 'product', targetId: Number(m1[1]) };
    const m2 = path.match(/\/articles\/(\d+)\/comments/);
    if (m2)
        return { targetType: 'article', targetId: Number(m2[1]) };
    return {};
}
async function getComment(req, res) {
    const { id } = (0, superstruct_1.create)(req.params, comment_struct_1.IdParamsStruct);
    res.json(await service.get(id));
}
async function getCommentList(req, res) {
    const q = (0, superstruct_1.create)(req.query, comment_struct_1.ListCommentsQueryStruct);
    res.json(await service.list(q));
}
async function createComment(req, res) {
    const body = (0, superstruct_1.create)(req.body, comment_struct_1.CreateCommentBodyStruct);
    const userId = req.user.id;
    const inferred = inferTargetFromPath(req);
    const targetType = body.targetType ?? inferred.targetType;
    const targetId = body.targetId ?? inferred.targetId;
    if (!targetType || typeof targetId !== 'number') {
        return res.status(400).json({ message: 'targetType and targetId are required' });
    }
    const dto = { content: body.content, targetType, targetId };
    const result = await service.create(userId, dto);
    res.status(201).json(result);
}
async function updateComment(req, res) {
    const { id } = (0, superstruct_1.create)(req.params, comment_struct_1.IdParamsStruct);
    const patch = (0, superstruct_1.create)(req.body, comment_struct_1.UpdateCommentBodyStruct);
    const userId = req.user.id;
    res.json(await service.update(id, userId, patch));
}
async function deleteComment(req, res) {
    const { id } = (0, superstruct_1.create)(req.params, comment_struct_1.IdParamsStruct);
    const userId = req.user.id;
    await service.remove(id, userId);
    res.status(204).send();
}
