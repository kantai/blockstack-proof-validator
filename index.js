const blockstack = require('blockstack')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');

function server () {
  var app = express()
  app.use(cors())
  app.use(bodyParser.json())

  app.post('/validate', function(req, res, next) {
    console.log(req)

    profile = req.body.profile
    address = req.body.address

    blockstack.validateProofs(profile, address)
      .then( proofs => res.send( proofs ) )
  })

  return app
}

let app = server()

app.listen(80, 'localhost')

//fetch('https://gaia.blockstack.org/hub/12mGibk1Y6xZXwcJruG2xZTbjuZ1tWvLqo/0/profile.json').then( resp => resp.json() ).then( x => x[0].decodedToken.payload.claim ).then( p => fetch( 'http://localhost/validate', { method : 'POST', body : JSON.stringify({profile : p, address : '12mGibk1Y6xZXwcJruG2xZTbjuZ1tWvLqo'} ) } )).then(console.log)
//
