const express = require('express')
const app = express()
const PORT = 4000
const routes = require('./routes')
const errHandler = require('./middleware/errorHandler')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', routes)
app.use(errHandler)

app.listen(PORT, () => {
  console.log('orcestrator is running on port: ', PORT)
})