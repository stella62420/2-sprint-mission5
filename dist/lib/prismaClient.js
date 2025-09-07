"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
exports.disconnect = disconnect;
const client_1 = require("@prisma/client");
const isProd = process.env.NODE_ENV === 'production';
const logs = process.env.NODE_ENV === 'test' ? undefined : ['warn', 'error'];
const g = global;
exports.prisma = g.__PRISMA__ ??
    new client_1.PrismaClient({
        log: logs,
    });
if (!isProd)
    g.__PRISMA__ = exports.prisma;
exports.default = exports.prisma;
async function disconnect() {
    await exports.prisma.$disconnect();
}
