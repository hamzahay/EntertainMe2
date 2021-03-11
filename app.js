const express = require('express')
const app = express()
const PORT = 3000
const routes = require('./routes/index')
const { run } = require('./config/mongodb')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

run().then( async () => {
  console.log('mongo dah jalan')

  app.get(('/'), (req, res) => {
    res.json({ message: 'on local' })
  })
  
  app.use(routes)

  app.listen(PORT, () => {
    console.log('udah jalan bang, di port', PORT)
  })
})