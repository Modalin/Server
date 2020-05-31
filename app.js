const express = require('express');
const app = express();
const router = require('./routes');
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/', router);
app.use((err, req, res, next) => {
  console.log(err)
  return res.status(500).json(err);
});

module.exports = app;