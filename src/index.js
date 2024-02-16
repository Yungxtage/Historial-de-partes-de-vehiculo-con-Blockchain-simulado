const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')

const BlockChain = require('./blockchain.js')
const app = express()

// blockchain
let blockchain_partes = new BlockChain('Genesis', '0000')
blockchain_partes.addBlock({id: 5, fecha_transaccion: new Date(), estado: "perfecto", ciudad: "Bogota"});


// configuracion
app.set('port', process.env.PORT || 3000)
app.set('json spaces', 2)
app.set('blockchain', blockchain_partes)

//midddleware
app.use(morgan('dev'))
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use(express.static('public'))

// rutas
app.use(require('./routes/index.js'))
// app.use('/api/movies',require('./routes/movies.js'))
app.use('/api/blockchain', require('./routes/rutas_blockchain.js'))

// iniciar servidor
app.listen(app.get('port'),  () =>{
    console.log(`El servidor se ha iniciado en http://localhost:${app.get('port')}`)
})