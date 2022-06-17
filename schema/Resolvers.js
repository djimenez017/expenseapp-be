// const { users } = require("../FakeData/fake");
const { GraphQLScalarType, __InputValue } = require("graphql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const naiveIsoDateRegex =
  /(\d{4})-(\d{2})-(\d{2})T((\d{2}):(\d{2}):(\d{2}))\.(\d{3})Z/;

const dateTimeScalar = new GraphQLScalarType({
  name: "DateTime",
  description: "Data type representing the date and time",
  parseValue: (value) => {
    if (!naiveIsoDateRegex.test(value)) {
      throw new Error("Invalid date format");
    }

    return new Date(value);
  },
  serialize: (value) => {
    return value.toISOString();
  },
});

const resolvers = {
  DateTime: dateTimeScalar,

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
      // console.log(context.user);
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
      //console.log(_args);
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
      //console.log(_args);
      const user = await context.prisma.user.findFirst(_args.username);
      if (!user) {
        throw new Error("Invalid username");
      }

      const passwordMatch = await bcrypt.compare(_args.password, user.password);
      //console.log(_args.password, user.password, passwordMatch);
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
