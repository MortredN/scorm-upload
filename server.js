const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const AdmZip = require('adm-zip');
const fs = require('fs');

const server = express();

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}

server.use(cors(corsOptions));
server.use(bodyParser.urlencoded({extended: true}));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});
   
var upload = multer({storage: storage});

dotenv.config({path: './elephantsql.env'});

const pe = process.env;
const pool = new Pool({
  user: pe.PGUSER,
  host: pe.PGHOST,
  database: pe.PGDATABASE,
  password: pe.PGPASSWORD,
  port: pe.PGPORT,
});

const deleteSameScorms = (repoName, userId) => {
  var deleteQuery = "DELETE FROM scorms WHERE (repo_name = $1 OR repo_url_name = $2) AND (user_id = $3);";
  var deleteValues = [repoName, repoName.replace(/\s+/g, '_'), userId];
  
  if (userId != '')
  {
    pool.query(deleteQuery, deleteValues, (err, result) => {
      if (err) {console.log(err.stack)}
    })
  }
  else
  {
    console.log('No user ID found - DELETE');
  }
}

const insertScorm = (req) => {
  var newRepo = req.file.originalname.substring(0, req.file.originalname.lastIndexOf('.'));

  deleteSameScorms(newRepo, req.body.userId);

  var insertQuery = "INSERT INTO scorms (upload_time, repo_name, repo_url_name, user_id) VALUES ($1, $2, $3, $4);";
  var insertValues = [new Date(), newRepo, newRepo.replace(/\s+/g, '_'), req.body.userId];

  if (req.body.userId != '')
  {
    pool.query(insertQuery, insertValues, (err, result) => {
      if (err) {console.log(err.stack)}
    })
  }
  else
  {
    console.log('No user ID found - INSERT');
  }
}

const unzipToUserFolder = (fileName, userId) => {
  if(!fs.existsSync(`./uploads/${userId}`))
  {
    fs.mkdirSync(`./uploads/${userId}`, {recursive: true}, (err) => {if (err) throw err});
  }
  var zip = new AdmZip(`./uploads/${fileName}`);
  zip.extractAllTo(`./uploads/${userId}`, true);
  fs.unlink(`./uploads/${fileName}`, (err) => {if (err) throw err});
}

server.get('/scorm/:user_id/:repo_name', (req, res) => {
  const query = {
    text: "SELECT * FROM scorms WHERE user_id = $1::text and repo_name = $2::text",
    values: [req.params.user_id, req.params.repo_name]
  }
  pool.query(query, (err, poolRes) => {
    res.json(poolRes.rows);
  });
});

server.get('/scorms/:user_id', (req, res) => {
  const query = {
    text: "SELECT * FROM scorms WHERE user_id = $1::text ORDER BY upload_time DESC",
    values: [req.params.user_id]
  }  
  pool.query(query, (err, poolRes) => {
    res.json(poolRes.rows);
  });
});

server.post('/scorm', upload.single('file'), (req, res) => {
  if (!req.file)
  {
    console.log("No file received");
  }
  else
  {
    console.log("File received");
    insertScorm(req);
    unzipToUserFolder(req.file.originalname, req.body.userId);
  }
});

server.use(express.static(`${__dirname}/dist/scorm-upload`))

server.get(/^(?:(?!(scorm)).)*$\r?\n?/, (req, res) => {
  res.sendFile(path.join(`${__dirname}/dist/scorm-upload/index.html`));
});

server.post('/run', (req, res) => {
  res.redirect(`http://localhost:3000/list?user_id=${req.body.user_id}&ext_url=${req.body.launch_presentation_return_url}`);
});

server.get("/play-scorm/:user_id/:repo_url_name/:repo_name", (req, res) => {
  var decodedRepoName = req.params.repo_name.replace('%20', ' ');
  
  server.use(`/play-scorm/${req.params.user_id}/${req.params.repo_url_name}`,
    express.static(`${__dirname}/uploads/${req.params.user_id}/${decodedRepoName}`));

  res.sendFile(path.join(`${__dirname}/uploads/${req.params.user_id}/${decodedRepoName}/index.htm`));
})

server.listen(3000, () => {
  console.log('Server started!');
  // package.json startup options need changes
});