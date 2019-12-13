# United Federation of Jean

This sample project has two independent GraphQL servers (using Apollo) and uses
Apollo Graph Manager to join them into a single GraphQL endpoint.

Based on [this Apollo tutorial](https://www.apollographql.com/docs/apollo-server/getting-started/)
and [this federation tutorial](https://www.apollographql.com/docs/apollo-server/federation/introduction/).

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
