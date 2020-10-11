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
    resp.status(200).json({register: 'from controller'})

}