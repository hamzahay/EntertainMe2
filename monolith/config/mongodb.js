const { MongoClient } = require('mongodb')

let database = null

async function run () {
  try {
    const uri = 'mongodb://localhost:27017'

    const client = new MongoClient(uri, { useUnifiedTopology: true })
    await client.connect()
    const db = client.db('EntertainMe')
    database = db
    return db
  } catch(err) {
    console.log(err)
  }
}

module.exports = {
  run,
  getDatabase() {
    return database
  }
}