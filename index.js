const blockstack = require('blockstack')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const winston = require('winston')

// $ npm i
// $ node index.js

function server () {
  var app = express()
  app.use(cors())
  app.use(bodyParser.json())

  app.post('/validate', function(req, res, next) {
    let profile = req.body.profile
    let address = req.body.address
    let username = req.body.username
    blockstack.validateProofs(profile, address, username)
      .catch(err => {
        if (err.message.indexOf('fully qualified') >= 0) {
          return blockstack.validateProofs(profile, address)
        } else {
          throw err
        }
      })
      .then( proofs => res.send( proofs ) )
      .catch(err => {
        winston.error(err)
      })
  })

  return app
}

let app = server()

app.listen(5000, 'localhost')
