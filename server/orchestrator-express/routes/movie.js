const router = require('express').Router()
const Controller = require('../controller/movieController')

router.post('/', Controller.create)
router.get('/', Controller.getAll)
router.put('/:id', Controller.update)
router.delete('/:id', Controller.delete)

module.exports = router