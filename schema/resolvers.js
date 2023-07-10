const Author = require("./Author");
const Book = require("./Book");

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

module.exports = resolvers;
