"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateNotificationReadStruct = exports.CreateNotificationBodyStruct = void 0;
const superstruct_1 = require("superstruct");
exports.CreateNotificationBodyStruct = (0, superstruct_1.object)({
    userId: (0, superstruct_1.number)(),
    message: (0, superstruct_1.string)(),
});
exports.UpdateNotificationReadStruct = (0, superstruct_1.object)({
    isRead: (0, superstruct_1.boolean)(),
});
