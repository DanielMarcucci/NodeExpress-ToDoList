const express = require('express')
const Tasks = require('../models/tasks')

const router = express.Router()

router.get('/', (req, res) => {
  Tasks.find()
    .exec()
    .then(x => res.status(200).send(x))
})

router.get('/:id', (req, res) => {
  Tasks.findById(req.params.id)
    .exec()
    .then(x => res.status(200).send(x))
})

router.post('/', (req, res) => {
  Tasks.create(req.body)
    .then(x => res.status(201).send(x))
})

router.put('/:id', (req, res) => {
  Tasks.findOneAndUpdate(req.params.id, req.body)
    .then(() => res.sendStatus(204))
})

router.delete('/:id', (req, res) => {
  Tasks.findByIdAndDelete(req.params.id)
    .exec()
    .then(() => res.sendStatus(204))
})

module.exports = router