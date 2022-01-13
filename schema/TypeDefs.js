const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: Int
    fullName: String
    username: String!
    password: String
    emailAddress: String
    website: String
    phoneNumber: String
    expenses: [Expense]
  }

  type Expense {
    id: Int
    author: [User]
    expenseAuthor: Int
    addedDate: String
    name: String
    category: [Category]
    amount: Int
    frequency(type: Frequency): String
    dateDue: String
  }

  type Category {
    id: Int
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
    getAllUsers: [User!]!
    getAllExpenses: [Expense]
    getAllCategories: [Category]
    getAllFrequencies: [Frequency]
  }

  #MUTATIONS
  type Mutation {
    createUser(
      id: Int
      fullName: String
      username: String!
      emailAddress: String
      website: String
      password: String
      phoneNumber: String
    ): User!
  }
`;

module.exports = { typeDefs };
