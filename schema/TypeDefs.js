const { gql } = require("apollo-server");

const typeDefs = gql`
  scalar DateTime

  type User {
    id: ID!
    fullName: String
    username: String!
    password: String
    emailAddress: String
    website: String
    phoneNumber: String
    expenses: [Expense]
  }

  type Expense {
    id: ID!
    author: [User]!
    expenseAuthor: Int
    addedDate: String
    name: String
    category: [Category]
    amount: Int
    frequency: Frequency
    dateDue: DateTime
  }

  type Category {
    id: ID!
    categoryName: String
    expense: [Expense]
    expenseID: Int
  }

  enum Frequency {
    DAILY
    WEEKLY
    MONTHLY
    YEARLY
  }

  #QUERIES
  type Query {
    users: [User!]!
    expenses: [Expense]
    categories: [Category]
    frequencies: [Frequency]
    user(id: ID!): User
  }

  #MUTATIONS
  type Mutation {
    createUser(
      fullName: String
      username: String
      emailAddress: String
      website: String
      password: String
      phoneNumber: String
    ): User!

    createExpense(
      name: String
      amount: Int
      frequency: Frequency
      dateDue: DateTime
    ): Expense!
  }
`;

module.exports = { typeDefs };
