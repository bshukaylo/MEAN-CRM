const express = require('express')
const controllers = require('../controllers/category')
const router = express.Router()

router.get('/', controllers.getAll)
router.get('/:id ', controllers.getById)
router.delete('/:id', controllers.remove)
router.post('/', controllers.create)
router.patch('/:id', controllers.update)

module.exports = router