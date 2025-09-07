"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductBodyStruct = exports.CreateProductBodyStruct = exports.ListProductsQueryStruct = void 0;
const superstruct_1 = require("superstruct");
exports.ListProductsQueryStruct = (0, superstruct_1.object)({
    q: (0, superstruct_1.optional)((0, superstruct_1.string)()),
    page: (0, superstruct_1.optional)((0, superstruct_1.coerce)((0, superstruct_1.number)(), (0, superstruct_1.string)(), (v) => Number(v))),
    pageSize: (0, superstruct_1.optional)((0, superstruct_1.coerce)((0, superstruct_1.number)(), (0, superstruct_1.string)(), (v) => Number(v))),
    orderBy: (0, superstruct_1.optional)((0, superstruct_1.enums)(['latest', 'popular', 'priceAsc', 'priceDesc'])),
    category: (0, superstruct_1.optional)((0, superstruct_1.string)()),
});
exports.CreateProductBodyStruct = (0, superstruct_1.object)({
    title: (0, superstruct_1.string)(),
    price: (0, superstruct_1.coerce)((0, superstruct_1.number)(), (0, superstruct_1.string)(), (v) => Number(v)),
    images: (0, superstruct_1.optional)((0, superstruct_1.array)((0, superstruct_1.string)())),
    category: (0, superstruct_1.optional)((0, superstruct_1.string)()),
    description: (0, superstruct_1.optional)((0, superstruct_1.string)()),
});
exports.UpdateProductBodyStruct = (0, superstruct_1.object)({
    title: (0, superstruct_1.optional)((0, superstruct_1.string)()),
    price: (0, superstruct_1.optional)((0, superstruct_1.coerce)((0, superstruct_1.number)(), (0, superstruct_1.string)(), (v) => Number(v))),
    images: (0, superstruct_1.optional)((0, superstruct_1.array)((0, superstruct_1.string)())),
    category: (0, superstruct_1.optional)((0, superstruct_1.string)()),
    description: (0, superstruct_1.optional)((0, superstruct_1.string)()),
});
