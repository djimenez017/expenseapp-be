// const { users } = require("../FakeData/fake");
// const { GraphQLScalarType, __InputValue } = require("graphql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { DateTime } = require("graphql-scalars");

const resolvers = {
  DateTime: { DateTime },

  Query: {
    users: (_parent, _args, context) => context.prisma.user.findMany(),

    user: (_parent, _args, context) =>
      context.prisma.user.findFirst({
        where: { id: context.ID },
      }),

    expenses: (_parent, _args, context) =>
      context.prisma.expense.findMany({
        where: { id: context.ID },
        include: {
          author: true,
        },
      }),

    expense: (_parent, _args, context) => {
      return context.prisma.expense.findFirst({
        where: { id: parseInt(_args.id) },
      });
    },

    categories: (_parent, _args, context) => context.prisma.category.findMany(),

    frequencies: (_parent, _args, context) =>
      context.prisma.frequency.findMany(),

    currentUser: (_parent, _args, context) => {
      if (!context.user) {
        throw new Error("Not Authenticated bro!");
      }
      return context.prisma.user.findFirst({ id: context.id });
    },
  },

  Mutation: {
    // createUser: (_parent, _args, context) =>
    //   context.prisma.user.create({
    //     data: {
    //       fullName: _args.fullName,
    //       emailAddress: _args.emailAddress,
    //       username: _args.username,
    //       password: _args.password,
    //       phoneNumber: _args.phoneNumber,
    //       website: _args.website,
    //       expenses: _args.expenses,
    //     },
    //   }),

    createExpense: (_parent, _args, context) =>
      context.prisma.expense.create({
        data: {
          name: _args.name,
          amount: _args.amount,
          frequency: _args.frequency,
          dateDue: _args.dateDue,
          author: {
            connect: {
              id: context.user.id,
            },
          },
        },
      }),

    register: async (_parent, _args, context) => {
      const hashedPassword = await bcrypt.hash(_args.password, 10);

      const newUser = await context.prisma.user.create({
        data: {
          fullName: _args.fullName,
          emailAddress: _args.emailAddress,
          username: _args.username,
          password: hashedPassword,
          phoneNumber: _args.phoneNumber,
          website: _args.website,
        },
      });
      return newUser;
    },

    login: async (_parent, _args, context) => {
      const user = await context.prisma.user.findFirst({
        where: { username: _args.username },
      });

      if (!user) {
        throw new Error("Invalid username");
      }

      const passwordMatch = await bcrypt.compare(_args.password, user.password);

      if (!passwordMatch) {
        throw new Error("Invalid Password!");
      }

      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
        },
        process.env.PRISMA_SECRET,
        {
          expiresIn: "30d",
        }
      );
      return { token, user };
    },

    updateExpense: async (_parent, _args, context) => {
      const updatedExpense = await context.prisma.expense.update({
        where: {
          id: _args.ID,
        },
        data: {
          name: _args.name,
          amount: _args.amount,
          frequency: _args.frequency,
          dateDue: _args.dateDue,
        },
      });
      return updatedExpense;
    },

    deleteExpense: async (_parent, _args, context) => {
      const deletedExpense = await context.prisma.expense.delete({
        where: {
          id: _args.ID,
        },
      });
      return deletedExpense;
    },
  },
};

module.exports = { resolvers };
