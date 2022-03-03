const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schema/TypeDefs");
const { resolvers } = require("./schema/Resolvers");
const { context } = require("./schema/context");
require("dotenv").config();
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

const server = new ApolloServer({ typeDefs, resolvers, context: context });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
