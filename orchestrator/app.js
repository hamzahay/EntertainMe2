const { ApolloServer, gql } = require('apollo-server')
const MovieSchema = require('./schema/movies')
const TvSchema = require('./schema/tvSeries')

const typeDefs = gql`
  type Query
  type Mutation
`

const server = new ApolloServer({
  typeDefs: [typeDefs, MovieSchema.typeDefs, TvSchema.typeDefs],
  resolvers: [MovieSchema.resolvers, TvSchema.resolvers]
})

server.listen().then(({ url }) => console.log('apollo runnging on: ', url))