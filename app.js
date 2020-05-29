const express = require('express');
const app = express();
const router = require('./routes');
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/', router);

module.exports = app

// app.listen(PORT, console.log(`Server running on Port ${PORT}`))