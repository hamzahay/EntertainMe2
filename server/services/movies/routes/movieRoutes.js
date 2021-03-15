const express = require('express')
const router = express.Router()
const Controller = require('../controller/movieController')

router.post('/', Controller.create)
router.get('/', Controller.find)
router.put('/:id', Controller.update)
router.delete('/:id', Controller.delete)

module.exports = router