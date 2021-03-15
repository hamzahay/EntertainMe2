const Movie = require('../models/movies')

class Controller {

  static async find (req, res, next) {
    try {
      const movies = await Movie.find()
      res.json(movies)
    } catch(err) {
      console.log(err)
      next(err)
    }
  }

  static async create (req, res, next) {
    try {
      const movie = await Movie.create(req.body)
      res.json(movie.ops[0])
    } catch(err) {
      console.log(err)
      next(err)
    }
  }

  static async update (req, res, next) {
    try {
      const id = req.params.id
      const movie = req.body
      const response = await Movie.update(id, movie)
      if (response.matchedCount === 0) {
        throw ({ name: 'notFound' })
      } else {
        res.json({ message: 'Update Success' })
      }
    } catch(err) {
      console.log(err)
      next(err)
    }
  }

  static async delete (req, res, next) {
    try {
      const id = req.params.id
      const response = await Movie.delete(id)
      if (response.deletedCount === 1) {
        res.json({ message: 'Delete Success' })
      } else {
        throw ({ name: 'notFound' })
      }
    } catch(err) {
      console.log(err)
      next(err)
    }
  }
}

module.exports = Controller