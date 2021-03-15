const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

class Controller {

  static async getAll (req, res, next) {
    try {
      const moviesData = await redis.get('server:movies')
      if (moviesData) {
        console.log('from redis')
        res.status(200).json(JSON.parse(moviesData))
      } else {
        console.log('from mongo')
        const { data } = await axios.get('http://localhost:4001')
        const response = await redis.set('server:movies', JSON.stringify(data))
        res.status(200).json(data)
      }
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  static async create (req, res, next) {
    try {
      const newData = req.body
      const { data } = await axios.post('http://localhost:4001', newData)
      const response = await redis.del('server:movies')
      res.status(201).json(data)
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  static async update (req, res, next) {
    try {
      const id = req.params.id
      const newData = req.body
      const { data } = await axios.put(`http://localhost:4001/${id}`, newData)
      if (data.message === 'notFound') {
        throw({ name: 'notFound' })
      } else {
        const response = await redis.del('server:movies')
        res.status(200).json(data)
      }
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  static async delete (req, res, next) {
    try {
      const id = req.params.id
      const { data } = await axios.delete(`http://localhost:4001/${id}`)
      if (data.message === 'notFound') {
        throw({ name: 'notFound' })
      } else {
        const response = await redis.del('server:movies')
        res.status(200).json(data)
      }
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
}

module.exports = Controller