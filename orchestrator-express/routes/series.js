const router = require('express').Router()
const Controller = require('../controller/tvController')

router.get('/', Controller.getAll)
router.post('/', Controller.create)
router.put('/:id', Controller.update)
router.delete('/:id', Controller.delete)

module.exports = router