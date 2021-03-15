const express = require('express')
const app = express()
const PORT = 4002
const routes = require('./routes/tvSeries')
const { run } = require('./config/mongodb')
const errorHandler = require('./middleware/errorHandler')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

run().then( async () => {
  console.log('mongo dah jalan')
  
  app.use(routes)
  app.use(errorHandler)

  app.listen(PORT, () => {
    console.log('server Tv Series udah jalan bang, di port', PORT)
  })
})