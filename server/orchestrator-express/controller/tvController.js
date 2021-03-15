const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

class Controller {

  static async getAll (req, res, next) {
    try {
      const seriesData = await redis.get('server:series')
      if (seriesData) {
        res.json(JSON.parse(seriesData))
      } else {
        const { data } = await axios.get('http://localhost:4002')
        const response = await redis.set('server:series', JSON.stringify(data))
        res.status(200).json(data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  static async create (req, res, next) {
    try {
      const newData = req.body
      const { data } = await axios.post('http://localhost:4002', newData)
      const response = await redis.del('server:series')
      res.status(201).json(data)
    } catch (err) {
      console.log(err)
    }
  }

  static async update (req, res, next) {
    try {
      const id = req.params.id
      const newData = req.body
      const { data } = await axios.put(`http://localhost:4002/${id}`, newData)
      if (data.message === 'notFound') {
        throw({ name: 'notFound' })
      } else {
        const response = await redis.del('server:series')
        res.status(200).json(data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  static async delete (req, res, next) {
    try {
      const id = req.params.id
      const { data } = await axios.delete(`http://localhost:4002/${id}`)
      if (data.message === 'notFound') {
        throw({ name: 'notFound' })
      } else {
        const response = await redis.del('server:series')
        res.status(200).json(data)
      }
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = Controller