# United Federation of Jean

This sample project has two independent GraphQL servers (using Apollo) and uses
Apollo Graph Manager to join them into a single GraphQL endpoint.

Based on [this Apollo tutorial](https://www.apollographql.com/docs/apollo-server/getting-started/)
and [this federation tutorial](https://www.apollographql.com/docs/apollo-server/federation/introduction/).

## Installation

Create a schema in [Apollo Graph Manager](https://engine.apollographql.com/).
Copy `.env.template` to `.env` and replace the placeholder with your Apollo
Graph Manager API key.

## Running It

### Starting the Federated Services

```bash
for s in service-?
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

## Coordinating with Graph Manager

Get the aggregate schema into Graph Manager with:

```bash
$ apollo service:push --endpoint http://localhost:4000
```

The services and the gateway must be up and running.

> You can install the `apollo` tools with:
>
>     $ npm install -g apollo
