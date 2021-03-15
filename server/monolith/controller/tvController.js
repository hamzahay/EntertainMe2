const Tv = require('../models/TvSeries')

class Controller {

  static async find (req, res) {
    try {
      const tvSeries = await Tv.find()
      res.json(tvSeries)
    } catch(err) {
      console.log(err)
    }
  }

  static async create (req, res) {
    try {
      const tvSerie = await Tv.create(req.body)
      res.json(tvSerie)
    } catch(err) {
      console.log(err)
    }
  }

  static async update (req, res) {
    try {
      const id = req.params.id
      const tv = req.body
      const response = await Tv.update(id, tv)
      res.json(response)
    } catch(err) {
      console.log(err)
    }
  }

  static async delete (req, res) {
    try {
      const id = req.params.id
      let message = 'Delete Fail'
      const response = await Tv.delete(id)
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