const TvSerie = require('../models/TvSeries')

class Controller {

  static async find (req, res) {
    try {
      const tvSeries = await TvSerie.find()
      res.json(tvSeries)
    } catch(err) {
      console.log(err)
    }
  }

  static async create (req, res) {
    try {
      const tvSerie = await TvSerie.create(req.body)
      res.json(tvSerie)
    } catch(err) {
      console.log(err)
    }
  }

  static async update (req, res) {
    try {
      const id = req.params.id
      const tvSerie = req.body
      const response = await TvSerie.update(id, tvSerie)
      res.json(response)
    } catch(err) {
      console.log(err)
    }
  }

  static async delete (req, res) {
    try {
      const id = req.params.id
      let message = 'Delete Fail'
      const response = await TvSerie.delete(id)
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