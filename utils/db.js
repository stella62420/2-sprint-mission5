const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = { db: prisma };