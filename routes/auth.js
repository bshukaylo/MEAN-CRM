 const express = require('express')
 const controllers = require('../controllers/auth')
 const router = express.Router()

 // localhost:5000/api/auth/login
 router.get('/login', controllers.login)
 // localhost:5000/api/auth/register
 router.get('/register', controllers.register)

 module.exports = router