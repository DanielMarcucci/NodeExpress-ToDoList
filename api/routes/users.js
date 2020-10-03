const express = require('express')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const Users = require('../models/Users')

const router = express.Router()

const singToken = (_id) => {
  jwt.sign({ _id }, 'mi-secreto', {
    expiresIn: 60 * 60 * 24 * 365
  })
}

router.get('/', (req, res) => {
  Users.find()
    .exec()
    .then(x => res.status(200).send(x))
    .catch(e => res.send(e))
})

router.get('/:id', (req, res) => {
  Users.findById(req.params.id)
    .exec()
    .then(x => res.status(200).send(x))
    .catch(e => res.send(e))
})

router.post('/register', (req, res) => {
  const { username, password, name } = req.body
  crypto.randomBytes(16, (err, salt) => {
    const newSalt = salt.toString('base64')
    crypto.pbkdf2(password, newSalt, 100, 64, 'sha1', (err, key) => {
      const encryptedPassword = key.toString('base64')
      Users.findOne({ username })
        .exec()
        .then(user => {
          if (user) {
            return res.send({
              result: 0,
              error: 'Usuario ya existe'
            })
          }
          Users.create({
            username,
            password: encryptedPassword,
            name,
            salt: newSalt
          })
            .then(() => {
              res.status(201).send({
                result: 1,
                success: 'Usuario creado exitosamente'
              })
            })
            .catch(e => res.send(e))
        })
    })
  })
})

router.post('/login', (req, res) => {
  const { username, password } = req.body
  Users.findOne({ username })
    .exec()
    .then(user => {
      if (!user) {
        return res.send({
          result: 0,
          error: 'Usuario no existe'
        })
      }
      crypto.pbkdf2(password, user.salt, 100, 64, 'sha1', (err, key) => {
        const encryptedPassword = key.toString('base64')
        if (user.password === encryptedPassword) {
          const token = singToken(user._id)
          return res.send({ token })
        }
        res.send({
          result: 0,
          error: 'El usuario y/o la contraseña son incorrectos'
        })
      })
    })
    .catch(e => res.send(e))
})

router.put('/:id', (req, res) => {
  Users.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.sendStatus(204))
    .catch(e => res.send(e))
})

router.delete('/:id', (req, res) => {
  Users.findByIdAndDelete(req.params.id)
    .exec()
    .then(() => res.sendStatus(204))
    .catch(e => res.send(e))
})

module.exports = router