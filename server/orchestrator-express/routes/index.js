const router = require('express').Router()
const movieRoutes = require('./movie')
const seriesRoutes = require('./series')

router.use('/movies', movieRoutes)
router.use('/series', seriesRoutes)

module.exports = router