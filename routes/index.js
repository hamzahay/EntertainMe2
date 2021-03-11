const express = require('express')
const router = express.Router()
const movieRoutes = require('./movieRoutes')
const tvRoutes = require('./tvSeries')

router.use('/movies', movieRoutes)
router.use('/tvseries', tvRoutes)

module.exports = router