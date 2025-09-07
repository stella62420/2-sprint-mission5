"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = create;
const superstruct_1 = require("superstruct");
function create(value, schema) {
    return (0, superstruct_1.create)(value, schema);
}
