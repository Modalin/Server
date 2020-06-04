const express = require('express');
const app = express();
const router = require('./routes');
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/', router);
app.use((err, req, res, next) => {
  if (err._message === 'Validation failed') {
    return res.status(400).json(err.errors)
  } else {
    return res.status(500).json(err);
  }
});

module.exports = app;