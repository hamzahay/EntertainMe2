const mongodb = require('mongodb')
const { getDatabase } = require('../config/mongodb')

class Tv {

  static find () {
    return getDatabase().collection('TvSeries').find().toArray()
  }

  static create (tvSerie) {
    return getDatabase().collection('TvSeries').insertOne(tvSerie)
  }

  static update (id, updateDoc) {
    const newDoc = {
      $set: updateDoc
    }
    return getDatabase().collection('TvSeries').updateOne({ _id: new mongodb.ObjectID(id) }, newDoc, { upsert: false })
  }

  static delete (id) {
    return getDatabase().collection('TvSeries').deleteOne({ _id: new mongodb.ObjectID(id) })
  }
}

module.exports = Tv