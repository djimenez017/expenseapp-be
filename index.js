const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schema/TypeDefs");
const { resolvers } = require("./schema/Resolvers");
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

const getUser = (token) => {
  try {
    if (token) {
      return jwt.verify(token, process.env.PRISMA_SECRET);
    }
    return null;
  } catch (err) {
    return null;
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const tokenWithBearer = req.headers.authorization || " ";
    const token = tokenWithBearer.split(" ")[1];
    const user = getUser(token);

    return {
      user,
      prisma,
    };
  },
});

server.listen(process.env.PORT || 5000);
