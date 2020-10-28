const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const authRoutes = require('./routes/auth')
const analyticsRoutes = require('./routes/analytics')
const categoryRoutes = require('./routes/category')
const orderRoutes = require('./routes/order')
const positionRoutes = require('./routes/position')
const keys = require('./config/keys')
const app = express()

mongoose.connect(keys.mongoURI,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('db start success'))
    .catch(error => console.log(error))

//passport
app.use(passport.initialize())
require('./middleware/passport')(passport)

//better logs
app.use(require('morgan')('dev'))

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
//cross origin resource sharing
app.use(require('cors')())

app.use('/api/auth', authRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/position', positionRoutes)

module.exports = app