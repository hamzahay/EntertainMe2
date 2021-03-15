const express = require('express')
const router = express.Router()
const Controller = require('../controller/tvController')

router.get('/', Controller.find)
router.post('/', Controller.create)
router.put('/:id', Controller.update)
router.delete('/:id', Controller.delete)

module.exports = router