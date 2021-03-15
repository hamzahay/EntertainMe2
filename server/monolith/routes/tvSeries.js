const express = require('express')
const router = express.Router()
const Controller = require('../controller/tvController')

router.get('/', Controller.find)
router.post('/', Controller.create)

module.exports = router