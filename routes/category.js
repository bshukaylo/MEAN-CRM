const express = require('express')
const passport = require('passport')
const controllers = require('../controllers/category')
const router = express.Router()

router.get('/', passport.authenticate('jwt', {session:false}), controllers.getAll)
router.get('/:id ', controllers.getById)
router.delete('/:id', controllers.remove)
router.post('/', controllers.create)
router.patch('/:id', controllers.update)

module.exports = router