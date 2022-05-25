const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const schema = require("./graphql/index");

const PORT = 4000;
const PATH = "/graphql";

mongoose.Promise = Promise;
mongoose
  .connect(process.env.MONGO_HOST, {
    dbName: process.env.MONGO_DB,
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASS,
  })
  .catch(() => console.log("Cannot connect to database"));

const createServer = async () => {
  const server = new ApolloServer({
    schema,
    playground: true,
  });
  await server.start();
  server.applyMiddleware({
    app,
    PATH,
    cors: {
      origin: "*",
    },
    credentials: true,
  });
};

createServer();

app.listen({ port: PORT }, () => {
  console.log(`Server ready at http://localhost:${PORT}/graphql`);
});
