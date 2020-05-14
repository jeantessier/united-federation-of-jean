const { ApolloServer } = require('apollo-server');
const { ApolloGateway } = require("@apollo/gateway");

require('dotenv').config();

const gateway = new ApolloGateway({
  serviceList: [
    { name: 'book', url: 'http://localhost:4001' },
    { name: 'author', url: 'http://localhost:4002' },
    { name: 'year', url: 'http://localhost:4003' },
  ]
});

// Pass the ApolloGateway to the ApolloServer constructor
const server = new ApolloServer({
  gateway,

  // Disable subscriptions (not currently supported with ApolloGateway)
  subscriptions: false,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
