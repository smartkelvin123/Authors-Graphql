const { ApolloServer } = require("apollo-server");
const { v4: uuid } = require("uuid");

const mongoose = require("mongoose");
const Author = require("./schema/Author");
const Book = require("./schema/Book");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });
const typeDefs = `
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

const resolvers = {
  Query: {
    authors: () => Author.find(),
    authorCount: () => Author.collection.countDocuments(),
    books: () => Book.find(),
    bookCount: () => Book.collection.countDocuments(),
    allBooks: (parent, args) => {
      if (!args.author && !args.genre) {
        return Book.find();
      }

      let query = {};

      if (args.author) {
        query.author = args.author;
      }

      if (args.genre) {
        query.genres = args.genre;
      }

      return Book.find(query);
    },
  },
  Mutation: {
    addAuthor: (parent, args) => {
      const author = new Author({ ...args });
      return author.save();
    },
    addBook: async (parent, args) => {
      const author = await Author.findOne({ name: args.author });

      if (!author) {
        throw new Error("Author not found");
      }

      const book = new Book({ ...args, author: author._id });
      return book.save();
    },
    editAuthor: (parent, args) => {
      const { name, setBornTo } = args;
      return Author.findOneAndUpdate(
        { name },
        { born: setBornTo },
        { new: true }
      );
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
