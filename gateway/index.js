const { ApolloServer } = require('apollo-server');
const { ApolloGateway } = require("@apollo/gateway");

require('dotenv').config();

const gateway = new ApolloGateway({
  serviceList: [
    { name: 'super', url: 'http://localhost:4100' },
    { name: 'a', url: 'http://localhost:4001' },
    { name: 'b', url: 'http://localhost:4002' },
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
