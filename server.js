const express = require('express')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const multer = require('multer')
const { Pool } = require('pg')
const dotenv = require('dotenv')
const AdmZip = require('adm-zip')
const fs = require('fs')

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
  var insertQuery = "INSERT INTO scorms (tutor_name, upload_time, repo_name, repo_url_name) VALUES ($1, $2, $3, $4);"
  var insertValues = [req.body.tutor, new Date(), newRepo, newRepo.replace(/\s+/g, '_')]
  pool.query(insertQuery, insertValues, (err, result) => {
    if (err) {console.log(err.stack)}
  })
}

const unzip = (fileName) => {
  var zip = new AdmZip(`./uploads/${fileName}`)
  zip.extractAllTo('./uploads', true)
  fs.unlink('./uploads/' + fileName, (err) => {if (err) throw err})
}

server.post('/upload-file', upload.single('file'), (req, res) => {
  if (!req.file) {
    console.log("No file received")
  }
  else {
    console.log("File received")
    insertScorm(req)
    unzip(req.file.originalname)
  }
})

server.get('/get/scorms', (req, res) => {
  pool.query("SELECT * FROM scorms", (err, poolRes) => {
    res.json(poolRes.rows)
  })
})

server.use(express.static(`${__dirname}/dist/scorm-upload`))
server.get(/^(?:(?!play-scorm).)*$\r?\n?/, (req, res) => {
  res.sendFile(path.join(`${__dirname}/dist/scorm-upload/index.html`))
});

server.get("/play-scorm/:repo_url_name/:repo_name", (req, res) => {
  var spacedRepoName = req.params.repo_name.replace('%20',' ');
  server.use(`/play-scorm/${req.params.repo_url_name}`, express.static(`${__dirname}/uploads/${spacedRepoName}`))
  res.sendFile(path.join(`${__dirname}/uploads/${spacedRepoName}/index.htm`))
})

server.listen(3000, () => {
  console.log('Server started!')
})