const express = require('express')
const cors = require('cors')

const server = express()

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
}

server.use(cors(corsOptions))

const upload = require('./upload')
server.post('/upload-file', upload)

server.listen(8000, () => {
  console.log('Server started!')
})