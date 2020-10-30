const express = require('express')
const passport = require('passport')
const controllers = require('../controllers/order')
const router = express.Router()

router.get('/', passport.authenticate('jwt', {session: false}), controllers.getAll)
router.post('/', passport.authenticate('jwt', {session: false}), controllers.create)

module.exports = router