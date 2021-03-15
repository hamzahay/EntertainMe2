const Tv = require('../models/TvSeries')

class Controller {

  static async find (req, res, next) {
    try {
      const tvSeries = await Tv.find()
      res.json(tvSeries)
    } catch(err) {
      console.log(err)
      next(err)
    }
  }

  static async create (req, res, next) {
    try {
      const tvSerie = await Tv.create(req.body)
      res.json(tvSerie.ops[0])
    } catch(err) {
      console.log(err)
      next(err)
    }
  }

  static async update (req, res, next) {
    try {
      const id = req.params.id
      const tv = req.body
      const response = await Tv.update(id, tv)
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
        const response = await Tv.delete(id)
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