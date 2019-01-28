'use strict';

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const upload = multer();
const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.post('/api/fileanalyse', upload.single('upfile'), (req, res, next) => {
  let file = req.file;

  if (file === undefined) {
    res.send('File not recognized');
  } else if (file.size >= 1073741824) { // reject all files heavier than 1GB
    res.send('File is too big to upload');
  } else {
  res.json({filename: file.originalname, type: file.mimetype, size: file.size});
  }
  next();
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});