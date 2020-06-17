const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Users = mongoose.model('User', new Schema({
    username: String,
    name: String,
    password: String,
    // task: [
    //   {
    //     name: String,
    //     description: String,
    //     usersID: String
    //   }
    // ]
}))

module.exports = Users