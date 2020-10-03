const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Tasks = mongoose.model('Task', new Schema({
    list_id: { type: Schema.Types.ObjectId, ref: 'List' },
    assigned_user_id: String,
    title: String,
    description: String,
    status: Boolean
}))

module.exports = Tasks