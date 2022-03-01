const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const context = {
  prisma: prisma,
  userId: 1,
};

module.exports = {
  context,
};
