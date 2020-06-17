const { ApolloServer } = require('apollo-server');
const { ApolloGateway } = require("@apollo/gateway");

require('dotenv').config();

const book_service = process.env.BOOK_SERVICE || 'http://localhost:4001'
const author_service = process.env.AUTHOR_SERVICE || 'http://localhost:4002'
const year_service = process.env.YEAR_SERVICE || 'http://localhost:4003'

const gateway = new ApolloGateway({
  serviceList: [
    { name: 'book', url: book_service },
    { name: 'author', url: author_service },
    { name: 'year', url: year_service },
  ]
});

// Pass the ApolloGateway to the ApolloServer constructor
const server = new ApolloServer({
  gateway,

  // Disable subscriptions (not currently supported with ApolloGateway)
  subscriptions: false,
  plugins: [
    {
      requestDidStart(requestContext) {
        console.log('Request did start!');
        console.log(`    query: ${requestContext.request.query}`);
        console.log(`    operationName: ${requestContext.request.operationName}`);
        console.log(`    variables: ${JSON.stringify(requestContext.request.variables)}`);
      }
    }
  ],
});

const port = process.env.PORT || 4000

server.listen(port).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
