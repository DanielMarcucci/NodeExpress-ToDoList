const express = require('express')
const app = express()

app.get('*', (req, res) => {
  console.log('asdf')
  res.send({ menssage: "si funcona"})
})

module.exports = app
