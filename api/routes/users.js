const express = require('express')
const Users = require('../models/users')

const router = express.Router()

router.get('/', (req, res) => {
  Users.find()
    .exec()
    .then(x => res.status(200).send(x))
})

router.get('/:id', (req, res) => {
  Users.findById(req.params.id)
    .exec()
    .then(x => res.status(200).send(x))
})

router.post('/', (req, res) => {
  Users.create(req.body)
    .then(x => res.status(201).send(x))
})

router.put('/:id', (req, res) => {
  Users.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.sendStatus(204))
})

router.delete('/:id', (req, res) => {
  Users.findByIdAndDelete(req.params.id)
    .exec()
    .then(() => res.sendStatus(204))
})

module.exports = router