 const express = require('express')
 const controllers = require('../controllers/auth')
 const router = express.Router()

 // localhost:5000/api/auth/login
 router.post('/login', controllers.login)
 // localhost:5000/api/auth/register
 router.post('/register', controllers.register)

 module.exports = router