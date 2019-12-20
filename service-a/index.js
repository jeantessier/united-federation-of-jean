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
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    popularBooks: [Book]
  }
  
  type Mutation {
    addBook(title: String!, author: String): Book
  }
`;

const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    popularBooks: () => books,
  },
  Mutation: {
    addBook: async (_, { title, author }) => {
      const book = { "title": title, "author": author };
      books.push(book);
      return book;
    },
  },
  Book: {
    __resolveReference(book, { fetchBookByTitle }) {
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
