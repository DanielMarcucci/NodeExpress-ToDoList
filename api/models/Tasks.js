const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Tasks = mongoose.model('Task', new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    title: String,
    description: String
}))

module.exports = Tasks