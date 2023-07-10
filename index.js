const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const typeDefs = require("./schema/schema");
const resolvers = require("./schema/resolvers");
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

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
