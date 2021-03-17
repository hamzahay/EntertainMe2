const { gql, ApolloError } = require('apollo-server')
const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

module.exports = {
  typeDefs: gql`
    type Movie {
      _id: ID
      title: String
      overview: String
      poster_path: String
      popularity: Float
      tags: [String]
    }

    input MovieInput {
      title: String!
      overview: String!
      poster_path: String!
      popularity: Float!
      tags: [String]
    }

    type MovieResponse {
      message: String
    }

    extend type Query {
      movies: [Movie]
    }

    extend type Mutation {
      addMovie(input: MovieInput!): Movie
      updateMovie(id: ID!, input: MovieInput!): MovieResponse
      deleteMovie(id: ID!): MovieResponse
    }
  `,

  resolvers: {
    Query: {
      async movies () {
        try {
          const moviesData = await redis.get('server:movies')
          if (moviesData) {
            return JSON.parse(moviesData)
          } else {
            const { data } = await axios.get('http://localhost:4001')
            const response = await redis.set('server:movies', JSON.stringify(data))
            return data
          }
        } catch (err) {
          console.log(err)
          return new ApolloError
        }
      }
    },
    Mutation: {
      async addMovie(_, args) {
        try {
          const { data } = await axios.post('http://localhost:4001', args.input)
          const response = await redis.del('server:movies')
          return data
        } catch (err) {
          console.log(err)
          return new ApolloError
        }
      },
      async updateMovie(_, args) {
        try {
          const { data } = await axios.put(`http://localhost:4001/${args.id}`, args.input)
          const response = await redis.del('server:movies')
          return data
        } catch (err) {
          console.log(err)
          return new ApolloError
        }
      },
      async deleteMovie(_, args) {
        try {
          const { data } = await axios.delete(`http://localhost:4001/${args.id}`)
          const response = await redis.del('server:movies')
          return data
        } catch (err) {
          console.log(err)
          return new ApolloError
        }
      }
    }
  }
}