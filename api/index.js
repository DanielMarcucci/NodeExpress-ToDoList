const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const users = require('./routes/users')
const tasks = require('./routes/tasks')
const lists = require('./routes/lists')

const app = express()

app.use(bodyParser.json())

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

// const Users = mongoose.model('User', new mongoose.Schema({ name: String }))

app.use('/api/users', users)
app.use('/api/tasks', tasks)
app.use('/api/lists', lists)

module.exports = app
// Users.create({
//   username: 'daniel01',
//   name: 'Daniel Rivera',
//   password: 'asdf',
//   task: [
//     {
//       name: 'Prueba 1',
//       description: 'Esta descripcion es de prueba',
//       usersID: ''
//     }
//   ]
// })

// app.get('*', (req, res) => {
//   console.log('asdf')
//   // res.send({name: 'asdfg'})
//   Users.find()
//     .then(x => res.send(x))
// })

