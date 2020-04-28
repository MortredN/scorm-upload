const express = require('express')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const multer = require('multer')
const { Pool } = require('pg')
const dotenv = require('dotenv')
const AdmZip = require('adm-zip')

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
   
var upload = multer({storage: storage})

dotenv.config({path: './elephantsql.env'})

const pe = process.env
const pool = new Pool({
  user: pe.PGUSER,
  host: pe.PGHOST,
  database: pe.PGDATABASE,
  password: pe.PGPASSWORD,
  port: pe.PGPORT,
})

const insertScorm = (req) => {
  var newRepo = req.file.originalname.substring(0, req.file.originalname.lastIndexOf('.'))
  var insertQuery = "INSERT INTO scorms (tutor_name, upload_time, file_path) VALUES ($1, $2, $3);"
  var insertValues = [req.body.tutor, new Date(), `${newRepo}/index.htm`]
  pool.query(insertQuery, insertValues, (err, result) => {
    if (err) {console.log(err.stack)}
  })
}

const unzip = (fileName) => {
  var zip = new AdmZip(`./uploads/${fileName}`)
  zip.extractAllTo('./uploads', true)
}

server.post('/upload-file', upload.single('file'), (req, res) => {
  if (!req.file) {
    console.log("No file received");
  }
  else {
    console.log("File received")
    insertScorm(req);
    unzip(req.file.originalname);
  }
})

server.use(express.static(__dirname + '/dist/scorm-upload'));

server.get('/*', (req, res) => {   
  res.sendFile(path.join(__dirname +'/dist/scorm-upload/index.html'));
});

server.listen(3000, () => {
  console.log('Server started!')
})