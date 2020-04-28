const express = require('express')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const multer = require('multer')

const server = express()

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}

server.use(cors(corsOptions))
server.use(bodyParser.urlencoded({extended: true}))

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
   
var upload = multer({ storage: storage })

server.post('/upload-file', upload.single('file'), (req, res, next) => {
  const file = req.file
  
  if (!file) {
    console.log("No file received");
  }
  else {
    console.log('file received');
  }
})

server.use(express.static(__dirname + '/dist/scorm-upload'));

server.get('/*', (req, res) => {   
  res.sendFile(path.join(__dirname +'/dist/scorm-upload/index.html'));
});

server.listen(3000, () => {
  console.log('Server started!')
})