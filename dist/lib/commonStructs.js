"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursorParamsStruct = exports.PageParamsStruct = exports.IdParamsStruct = void 0;
const superstruct_1 = require("superstruct");
const toNum = (v, def) => v == null || v === '' ? def : Number(v);
exports.IdParamsStruct = (0, superstruct_1.object)({
    id: (0, superstruct_1.coerce)((0, superstruct_1.number)(), (0, superstruct_1.string)(), (v) => Number(v)),
});
exports.PageParamsStruct = (0, superstruct_1.object)({
    page: (0, superstruct_1.coerce)((0, superstruct_1.number)(), (0, superstruct_1.string)(), (v) => toNum(v, 1)),
    pageSize: (0, superstruct_1.coerce)((0, superstruct_1.number)(), (0, superstruct_1.string)(), (v) => toNum(v, 10)),
    keyword: (0, superstruct_1.optional)((0, superstruct_1.coerce)((0, superstruct_1.string)(), (0, superstruct_1.string)(), (v) => (v ?? '').trim())),
    orderBy: (0, superstruct_1.optional)((0, superstruct_1.union)([
        (0, superstruct_1.literal)('latest'),
        (0, superstruct_1.literal)('oldest'),
        (0, superstruct_1.literal)('priceAsc'),
        (0, superstruct_1.literal)('priceDesc'),
    ])),
});
exports.CursorParamsStruct = (0, superstruct_1.object)({
    cursor: (0, superstruct_1.optional)((0, superstruct_1.coerce)((0, superstruct_1.number)(), (0, superstruct_1.string)(), (v) => Number(v))),
    take: (0, superstruct_1.coerce)((0, superstruct_1.number)(), (0, superstruct_1.string)(), (v) => toNum(v, 20)),
    limit: (0, superstruct_1.optional)((0, superstruct_1.coerce)((0, superstruct_1.number)(), (0, superstruct_1.string)(), (v) => Number(v))),
});
