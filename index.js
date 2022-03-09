const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schema/TypeDefs");
const { resolvers } = require("./schema/Resolvers");
// const { context } = require("./schema/context");
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

const getUser = (token) => {
  console.log(token);
  try {
    if (token) {
      return jwt.verify(token, process.env.PRISMA_SECRET);
    }
    return null;
  } catch (err) {
    // console.log(err);
    return null;
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const tokenWithBearer = req.headers.authorization || " ";

    const token = tokenWithBearer.split(" ")[1];
    // console.log(token);
    const user = getUser(token);

    return {
      user,
      prisma,
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
