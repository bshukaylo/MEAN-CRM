const User = require('../models/User')

module.exports.login = function (req, resp) {
    resp.status(200).json(
        {
            login: {
                email: req.body.email,
                password: req.body.password,
            }
        })
}

module.exports.register = function (req, resp) {
    const user = new User({
        email: req.body.email,
        password: req.body.password
    })
    user.save().then(() => console.log("user created"));
}