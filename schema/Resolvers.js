// const { users } = require("../FakeData/fake");

const resolvers = {
  // Query: {
  //   getAllUsers: () => users,
  // }

  Query: {
    /**
     * @param {any} _parent
     * @param {any} _args
     * @param {{ prisma: Prisma }} context
     */

    getAllUsers: (_parent, _args, context) => {
      console.log(context);
      return context.prisma.user.findMany();
    },
  },

  Mutation: {
    createUser(parent, args) {
      const newUser = args;
      users.push(newUser);
      return newUser;
    },
  },
};

module.exports = { resolvers };
