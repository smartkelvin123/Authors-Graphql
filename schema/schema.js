const { gql } = require("apollo-server");

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    id: ID!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Query {
    authors: [Author!]!
    authorCount: Int!
    books: [Book!]!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
  }

  type Mutation {
    addAuthor(name: String!, born: Int): Author
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

module.exports = typeDefs;
