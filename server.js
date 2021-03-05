const express = require("express");
const bodyParser = require("body-parser");
const graphqlHTTP = require("express-graphql");

const graphQLSchema = require("./graphql/schema/index");
const graphQLResolvers = require("./graphql/resolvers/index");

//dbSetup
require("./db/db");

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Construct a schema, using GraphQL schema language
app.use(
  "/graphql",
  graphqlHTTP((request) => ({
    schema: graphQLSchema,
    rootValue: graphQLResolvers,
    context: request.headers,
    graphiql: true,
    pretty: true
  }))
);

const port = process.env.PORT || 4000;
app.listen(port);
console.log(
  "Running a GraphQL API server at https://8tdto.sse.codesandbox.io/graphql"
);
