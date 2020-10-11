const express = require('express')
const controllers = require('../controllers/position')
const router = express.Router()

router.get('/:categoryId', controllers.getByCategoryId)
router.post('/', controllers.create)
router.patch('/:id', controllers.update)
router.delete('/:id', controllers.remove)

module.exports = router