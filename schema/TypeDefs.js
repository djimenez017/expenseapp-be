const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    userID: Int
    userFullName: String
    username: String!
    userPassword: String
    userEmailAddress: String
    userWebsite: String
    userPhoneNumber: String
    userExpenses: Expense
  }

  type Expense {
    expenseID: Int
    author: [User]
    expenseAuthor: Int
    expenseAddedDate: String
    expenseName: String
    expenseCategory: Category
    expenseAmount: Int
    expenseDateDue: String
  }

  type Category {
    categoryID: Int
    categoryName: String
    expense: [Expense]
    expenseID: Int
  }

  #QUERIES
  type Query {
    getAllUsers: [User!]!
    getAllExpenses: [Expense]
    getAllCategories: [Category]
  }

  #MUTATIONS
  type Mutation {
    createUser(
      userID: Int
      userFullName: String
      username: String!
      userEmailAddress: String
      userWebsite: String
    ): User!
  }
`;

module.exports = { typeDefs };
