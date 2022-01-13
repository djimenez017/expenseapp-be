// const { users } = require("../FakeData/fake");

const { context } = require("./context");

const resolvers = {
  Query: {
    getAllUsers: (_parent, _args, context) => {
      return context.prisma.user.findMany();
    },

    getAllCategories: (_parent, _args, context) => {
      return context.prisma.category.findMany();
    },

    getAllExpenses: (_parent, _args, context) => {
      return context.prisma.expense.findMany();
    },

    getAllFrequencies: (_parent, _args, context) => {
      return context.prisma.frequency.findMany();
    },
  },

  Mutation: {
    createUser: (_parent, _args, context) => {
      return context.prisma.user.create({
        data: {
          fullName: _args.fullName,
          emailAddress: _args.emailAddress,
          username: _args.username,
          password: _args.password,
          phoneNumber: _args.phoneNumber,
          website: _args.website,
          expenses: _args.expenses,
        },
      });
    },

    // createExpense:(_parent,_args,context) => {
    //   return context.prisma.expense.create({
    //     data
    //   })
    // }
  },
};

module.exports = { resolvers };
