// const { users } = require("../FakeData/fake");
const { GraphQLScalarType } = require("graphql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { context } = require("./context");
const { prisma } = require("@prisma/client");

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
      context.prisma.expense.findFirst({
        where: { id: context.ID },
      }),

    categories: (_parent, _args, context) => context.prisma.category.findMany(),

    frequencies: (_parent, _args, context) =>
      context.prisma.frequency.findMany(),
  },

  Mutation: {
    createUser: (_parent, _args, context) =>
      context.prisma.user.create({
        data: {
          fullName: _args.fullName,
          emailAddress: _args.emailAddress,
          username: _args.username,
          password: _args.password,
          phoneNumber: _args.phoneNumber,
          website: _args.website,
          expenses: _args.expenses,
        },
      }),

    createExpense: (_parent, _args, context) =>
      context.prisma.expense.create({
        data: {
          name: _args.name,
          amount: _args.amount,
          frequency: _args.frequency,
          dateDue: _args.dateDue,
          author: {
            connect: {
              id: context.userId,
            },
          },
        },
      }),

    // loginUser: (_parent, _args, context, info) => {},
  },
};

module.exports = { resolvers };

// context.prisma.user.create({
//   data: {
//     fullName: _args.fullName,
//     emailAddress: _args.emailAddress,
//     username: _args.username,
//     password: bcrypt.hashSync(_args.password, 3),
//     phoneNumber: _args.phoneNumber,
//     website: _args.website,
//     expenses: _args.expenses,
//   },
// }),
