const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book @key(fields: "title") {
    title: String!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }

  type Mutation {
    addBook(title: String!): Book
  }
`;

const books = [
  { title: 'Harry Potter and the Chamber of Secrets' },
  { title: 'Jurassic Park' },
  { title: 'The Hobbit' },
  { title: 'The Fellowship of the Ring' },
  { title: 'The Two Towers' },
  { title: 'The Return of the King' },
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
  },
  Mutation: {
    addBook: async (_, { title }) => {
      const book = { "title": title };
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
  schema: buildFederatedSchema([{ typeDefs, resolvers }])
});

const port = process.env.PORT || 4001

// The `listen` method launches a web server.
server.listen(port).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
