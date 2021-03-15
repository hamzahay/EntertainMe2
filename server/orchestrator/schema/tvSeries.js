const { gql } = require('apollo-server')
const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

module.exports = {
  typeDefs: gql`
    type Tv {
      _id: ID
      title: String
      overview: String
      poster_path: String
      popularity: Float
      tags: [String]
    }

    input TvInput {
      title: String
      overview: String
      poster_path: String
      popularity: Float
      tags: [String]
    }

    type TvResponse {
      message: String
    }

    extend type Query {
      tvSeries: [Tv]
    }

    extend type Mutation {
      addTv(input: TvInput): Tv
      updateTv(id: ID!, input: TvInput): TvResponse
      deleteTv(id: ID!): TvResponse
    }
  `,

  resolvers: {
    Query: {
      async tvSeries () {
        try {
          const seriesData = await redis.get('server:series')
          if (seriesData) {
            console.log('from redis')
            return JSON.parse(seriesData)
          } else {
            console.log('from mongo')
            const { data } = await axios.get('http://localhost:4002')
            const response = await redis.set('server:series', JSON.stringify(data))
            return data
          }
        } catch (err) {
          console.log(err)
        }
      }
    },
    Mutation: {
      async addTv(_, args) {
        try {
          const { data } = await axios.post('http://localhost:4002', args.input)
          const response = await redis.del('server:series')
          return data
        } catch (err) {
          console.log(err)
        }
      },
      async updateTv(_, args) {
        try {
          const { data } = await axios.put(`http://localhost:4002/${args.id}`, args.input)
          const response = await redis.del('server:series')
          return data
        } catch (err) {
          console.log(err)
        }
      },
      async deleteTv(_, args) {
        try {
          const { data } = await axios.delete(`http://localhost:4002/${args.id}`)
          const response = await redis.del('server:series')
          return data
        } catch (err) {
          console.log(err)
        }
      }
    }
  }
}