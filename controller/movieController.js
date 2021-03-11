const Movie = require('../models/movies')

class Controller {

  static async find (req, res) {
    try {
      const movies = await Movie.find()
      res.json(movies)
    } catch(err) {
      console.log(err)
    }
  }

  static async create (req, res) {
    try {
      const movie = await Movie.create(req.body)
      res.json(movie)
    } catch(err) {
      console.log(err)
    }
  }

  static async update (req, res) {
    try {
      const id = req.params.id
      const movie = req.body
      const response = await Movie.update(id, movie)
      res.json(response)
    } catch(err) {
      console.log(err)
    }
  }

  static async delete (req, res) {
    try {
      const id = req.params.id
      let message = 'Delete Fail'
      const response = await Movie.delete(id)
      if (response.deletedCount === 1) {
        message = 'Delete Succeed'
      }
      res.json({ message: message })
    } catch(err) {
      console.log(err)
    }
  }
}

module.exports = Controller