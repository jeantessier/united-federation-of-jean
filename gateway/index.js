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
  engine: { apiKey: process.env.ENGINE_API_KEY },

  // Disable subscriptions (not currently supported with ApolloGateway)
  subscriptions: false,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
