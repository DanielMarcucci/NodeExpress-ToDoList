const jwt = require('jsonwebtoken')
const Users = require('../api/models/Users')

module.exports = (req, res, next) => {
  const token = req.headers.token_autorization
  if (!token) {
    res.sendStatus(403)
  }
  jwt.verify(token, 'mi-secreto', (err, decoded) => {
    const { _id } = decoded
    Users.findOne({ _id }).exec()
      .then(user => {
        req.user = user
        next()
      })
  })
}
