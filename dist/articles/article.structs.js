"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListArticlesQueryStruct = exports.UpdateArticleBodyStruct = exports.CreateArticleBodyStruct = exports.IdParamsStruct = void 0;
const superstruct_1 = require("superstruct");
exports.IdParamsStruct = (0, superstruct_1.object)({
    id: (0, superstruct_1.coerce)((0, superstruct_1.number)(), (0, superstruct_1.string)(), (v) => parseInt(v, 10)),
});
exports.CreateArticleBodyStruct = (0, superstruct_1.object)({
    title: (0, superstruct_1.size)((0, superstruct_1.string)(), 1, 200),
    content: (0, superstruct_1.size)((0, superstruct_1.string)(), 1, 10000),
    image: (0, superstruct_1.optional)((0, superstruct_1.string)()),
});
exports.UpdateArticleBodyStruct = (0, superstruct_1.partial)(exports.CreateArticleBodyStruct);
exports.ListArticlesQueryStruct = (0, superstruct_1.object)({
    q: (0, superstruct_1.optional)((0, superstruct_1.size)((0, superstruct_1.string)(), 0, 200)),
    keyword: (0, superstruct_1.optional)((0, superstruct_1.size)((0, superstruct_1.string)(), 0, 200)),
    orderBy: (0, superstruct_1.optional)((0, superstruct_1.enums)(['latest', 'oldest', 'liked'])),
    page: (0, superstruct_1.optional)((0, superstruct_1.coerce)((0, superstruct_1.number)(), (0, superstruct_1.string)(), (v) => Number(v))),
    pageSize: (0, superstruct_1.optional)((0, superstruct_1.coerce)((0, superstruct_1.number)(), (0, superstruct_1.string)(), (v) => Number(v))),
});
