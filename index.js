const blockstack = require('blockstack')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');

// $ npm i
// $ node index.js

function server () {
  var app = express()
  app.use(cors())
  app.use(bodyParser.json())

  app.post('/validate', function(req, res, next) {
    profile = req.body.profile
    address = req.body.address

    blockstack.validateProofs(profile, address)
      .then( proofs => res.send( proofs ) )
  })

  return app
}

let app = server()

app.listen(80, 'localhost')
