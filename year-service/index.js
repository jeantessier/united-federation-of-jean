const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  extend type Book @key(fields: "title") {
    title: String! @external
    year: Int
  }

  type Mutation {
    addBookYear(title: String!, year: Int): Book
  }
`;

const books = [
  {
    title: 'The Hobbit',
    year: 1937,
  },
  {
    title: 'The Fellowship of the Ring',
    year: 1954,
  },
  {
    title: 'The Two Towers',
    year: 1954,
  },
  {
    title: 'The Return of the King',
    year: 1955,
  },
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Mutation: {
    addBookYear: async (_, { title, year }) => {
      const book = { title, year };
      books.push(book);
      return book;
    },
  },
  Book: {
    __resolveReference(book) {
      return fetchBookByTitle(book.title)
    }
  }
};

const fetchBookByTitle = title => books.find(book => title == book.title);

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
  plugins: [
    {
      requestDidStart(requestContext) {
        console.log('Request did start!');
        console.log(`    query: ${requestContext.request.query}`);
        console.log(`    operationName: ${requestContext.request.operationName}`);
        console.log(`    variables: ${JSON.stringify(requestContext.request.variables)}`);
        console.log(`    books: ${JSON.stringify(books)}`);
      }
    }
  ],
});

const port = process.env.PORT || 4003

// The `listen` method launches a web server.
server.listen(port).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
