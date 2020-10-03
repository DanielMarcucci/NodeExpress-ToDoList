const express = require('express')
const Lists = require('../models/Lists')

const router = express.Router()

router.get('/', (req, res) => {
  Lists.find()
    .exec()
    .then(x => res.status(200).send(x))
    .catch(e => res.send(e))
})

router.get('/:id', (req, res) => {
  Lists.findById(req.params.id)
    .exec()
    .then(x => res.status(200).send(x))
    .catch(e => res.send(e))
})

router.post('/', (req, res) => {
  Lists.create(req.body)
    .then(x => res.status(201).send(x))
    .catch(e => res.send(e))
})

router.put('/:id', (req, res) => {
  Lists.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.sendStatus(204))
    .catch(e => res.send(e))
})

router.delete('/:id', (req, res) => {
  Lists.findByIdAndDelete(req.params.id)
    .exec()
    .then(() => res.sendStatus(204))
    .catch(e => res.send(e))
})

module.exports = router