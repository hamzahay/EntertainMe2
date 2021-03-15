const mongodb = require('mongodb')
const { getDatabase } = require('../config/mongodb')

class Movie {

  static find () {
    return getDatabase().collection('Movies').find().toArray()
  }

  static findOne (id) {
    return getDatabase().collection('Movies').find({ _id: new mongodb.ObjectID(id) }).toArray()
  }

  static create (movie) {
    return getDatabase().collection('Movies').insertOne(movie)
  }

  static update (id, updateDoc) {
    const newDoc = {
      $set: updateDoc
    }
    return getDatabase().collection('Movies').updateOne({ _id: new mongodb.ObjectID(id) }, newDoc, { upsert: false })
  }

  static delete (id) {
    return getDatabase().collection('Movies').deleteOne({ _id: new mongodb.ObjectID(id) })
  }
}

module.exports = Movie