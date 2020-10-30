const Order = require('../models/Order')
const errorHandler = require('../utils/errorHandler')

// (GET) localhost:500/api/order?offset=2&limit=5
module.exports.getAll = async function (req, resp) {
    const query = {
        user: req.user.id,
    }
    //start date
    if (req.query.start) {
        query.date = {
            $gte: req.query.start //greater or equal
        }
    }
    //end date
    if (req.query.end) {
        if(!query.date) {
            query.date = {}
        }
        query.date['$lte'] = req.query.end
    }

    if (req.query.order) {
        query.order = +req.query.order
    }

    try {
        const orders = await Order
            .find(query)
            .sort({date: -1})
            .skip(+req.query.offset)//make a number from string using + operator
            .limit(+req.query.limit)

        resp.status(200).json(orders)
    } catch (e) {
        errorHandler(resp, e)
    }
}

module.exports.create = async function (req, resp) {
    try {
        //сортировка по дате - убывание
        const lastOrder = Order.findOne({
            user: req.user.id
        }).sort({date: -1})
        const maxOrder = lastOrder ? lastOrder.order : 0
        const order = await new Order({
            list: req.body.list,
            user: req.user.id,
            order: maxOrder + 1
        }).save()
        resp.status(201).json(order)
    } catch (e) {
        errorHandler(resp, e)
    }
}