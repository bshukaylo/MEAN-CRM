module.exports.login = function (req, resp) {
    resp.status(200).json({login: 'from controller'})
}

module.exports.register = function (req, resp) {
    resp.status(200).json({register: 'from controller'})

}