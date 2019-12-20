# United Federation of Jean

This sample project has two independent GraphQL servers (using Apollo) and uses
Apollo Graph Manager to join them into a single GraphQL endpoint.

Based on [this Apollo tutorial](https://www.apollographql.com/docs/apollo-server/getting-started/)
and [this mutation tutorial](https://www.apollographql.com/docs/tutorial/resolvers/#write-mutation-resolvers)
and [this federation tutorial](https://www.apollographql.com/docs/apollo-server/federation/introduction/).

## Installation

Create a schema in [Apollo Graph Manager](https://engine.apollographql.com/).
Copy each `.env.template` to `.env` and replace the placeholder with your Apollo
Graph Manager API key.

## Running It

### Starting the Federated Services

```bash
for s in *-service
do
  (cd $s; npm install; node index.js &)
done
```

### Starting the Gateway

```bash
(cd gateway; npm install; node index.js &)
```

### Placing Queries

Point your browser to http://localhost:4000/.

Example query:

```graphql
query AllBooks {
  books {
    title
    author
    year
  }
}
```

Example mutation:

```graphql
mutation AddPopularTolkienBook($title: String!, $author: String, $year: Int) {
  addBook(title: $title) {
    title
    author
    year
  }
  addBookAuthor(title: $title, author: $author) {
    title
    author
    year
  }
  addBookYear(title: $title, year: $year) {
    title
    author
    year
  }
}
```

with values:

```json
{
  "title": "The Silmarillion",
  "author": "Christopher Tolkien",
  "year": 1977
}
```

See how the response shows the entity getting built out:

```json
{
  "data": {
    "addBook": {
      "title": "The Silmarillion",
      "author": null,
      "year": null
    },
    "addPopularBook": {
      "title": "The Silmarillion",
      "author": "Christopher Tolkien",
      "year": null
    },
    "addTolkienBook": {
      "title": "The Silmarillion",
      "author": "Christopher Tolkien",
      "year": 1977
    }
  }
}
```

## Coordinating with Graph Manager

Get the aggregate schema into Graph Manager with:

```bash
apollo service:push --endpoint http://localhost:4000 --key [your Graph Manager API key]
```

If you are in a folder with a `.env` file, `apollo` will read the key from it if
you don't provide one on the command line.

The services and the gateway all must be up and running.

> You can install the `apollo` tools with:
>
>     $ npm install -g apollo
