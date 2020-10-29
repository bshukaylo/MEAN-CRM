const Category = require('../models/Category')
const Position = require('../models/Position')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, resp) {
    try {
        const categories = await Category.find({user:req.user.id})
        resp.status(200).json(categories)
    } catch (e) {
        errorHandler(resp, e)
    }
}

module.exports.getById = async function (req, resp) {
    try {
        const category = await Category.findById(req.params.id)
        resp.status(200).json(category)
    } catch (e) {
        errorHandler(resp, e)
    }
}

module.exports.remove = async function (req, resp) {
    try {
        await Category.remove({_id: req.params.id})
        await Position.remove({category: req.params.id})
        resp.status(200).json({message: 'Все категории и связанные с ними позиции удалены'})
    } catch (e) {
        errorHandler(resp, e)
    }
}

module.exports.create = function (req, resp) {
    try {
    } catch (e) {
        errorHandler(resp, e)
    }
}

module.exports.update = function (req, resp) {
    try {
    } catch (e) {
        errorHandler(resp, e)
    }
}