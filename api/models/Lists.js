const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Lists = mongoose.model('List', new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    color: String,
    title: String,
    icon: String
}))

module.exports = Lists