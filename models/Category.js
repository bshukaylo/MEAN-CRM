const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
    name : {
        type: String,
        required:true
    },
    imgSrc: {
        type: String,
        default:''
    },
    user: {
        ref:'users',
        type: mongoose.Types.ObjectId
    }
})

module.exports = mongoose.model('categories', categorySchema)