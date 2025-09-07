"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdParamsStruct = exports.ListCommentsQueryStruct = exports.UpdateCommentBodyStruct = exports.CreateCommentBodyStruct = void 0;
const superstruct_1 = require("superstruct");
const toNum = (v, def) => (v == null || v === '' ? def : Number(v));
exports.CreateCommentBodyStruct = (0, superstruct_1.object)({
    content: (0, superstruct_1.string)(),
    targetType: (0, superstruct_1.optional)((0, superstruct_1.union)([(0, superstruct_1.literal)('product'), (0, superstruct_1.literal)('article')])),
    targetId: (0, superstruct_1.optional)((0, superstruct_1.coerce)((0, superstruct_1.number)(), (0, superstruct_1.string)(), v => Number(v))),
});
exports.UpdateCommentBodyStruct = (0, superstruct_1.object)({
    content: (0, superstruct_1.string)(),
});
exports.ListCommentsQueryStruct = (0, superstruct_1.object)({
    page: (0, superstruct_1.coerce)((0, superstruct_1.number)(), (0, superstruct_1.string)(), v => toNum(v, 1)),
    pageSize: (0, superstruct_1.coerce)((0, superstruct_1.number)(), (0, superstruct_1.string)(), v => toNum(v, 20)),
    targetType: (0, superstruct_1.optional)((0, superstruct_1.union)([(0, superstruct_1.literal)('product'), (0, superstruct_1.literal)('article')])),
    targetId: (0, superstruct_1.optional)((0, superstruct_1.coerce)((0, superstruct_1.number)(), (0, superstruct_1.string)(), v => Number(v))),
    userId: (0, superstruct_1.optional)((0, superstruct_1.coerce)((0, superstruct_1.number)(), (0, superstruct_1.string)(), v => Number(v))),
});
exports.IdParamsStruct = (0, superstruct_1.object)({
    id: (0, superstruct_1.coerce)((0, superstruct_1.number)(), (0, superstruct_1.string)(), v => Number(v)),
});
