const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schema/TypeDefs");
const { resolvers } = require("./schema/Resolvers");
const { context } = require("./schema/context");
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

const server = new ApolloServer({ typeDefs, resolvers, context: context });

// server.start().then((res) => {
//   server.applyMiddleware({ app });

//   app.listen({ port: 3001 }, () => {
//     console.log("Server running on PORT:3001");
//   });
// });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
