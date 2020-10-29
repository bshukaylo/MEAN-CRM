const Position = require('../models/Position')
const errorHandler = require('../utils/errorHandler')

module.exports.getByCategoryId = async function (req, resp) {
    try {
        const positions = await Position.find({
            category: req.params.categoryId,
            user: req.user.id
        })
        resp.status(200).json(positions)
    } catch (e) {
        errorHandler(resp, e)
    }
}

module.exports.create = async function (req, resp) {
    try {
        const position = await new Position({
            name: req.body.name,
            cost: req.body.cost,
            category: req.body.category,
            user: req.user.id
        }).save()
        resp.status(201).json(position)
    } catch (e) {
        errorHandler(resp, e)
    }
}

module.exports.remove = async function (req, resp) {
    try {
        await Position.remove({_id: req.params.id})
        resp.status(200).json({message: 'Позиция была удалена'})
    } catch (e) {
        errorHandler(resp, e)
    }
}

module.exports.update = async function (req, resp) {
    try {
        //filter -> по какому полю ищем
        // doc -> какие поля меняем, т.к. $set, то те что в body
        //options - new -> вернуть обновленную сущность, а не до изменения
        const position = Position.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new:true}
            )
        resp.status(200).json(position)
    } catch (e) {
        errorHandler(resp, e)
    }
}