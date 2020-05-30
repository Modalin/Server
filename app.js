const express = require('express');
const app = express();
<<<<<<< HEAD
// const router = require('./routes');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const { db } = require('./config');

db.once('open', function() {
  app.use(express.urlencoded({extended: false}));
  app.use(express.json());
  app.use(cors());
  app.use('/', require('./routes'));
  
  app.listen(PORT, console.log(`Server running on Port ${PORT}`));
});
=======
const router = require('./routes');
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
>>>>>>> login-regist

<<<<<<< HEAD
app.use('/', router);

<<<<<<< HEAD
module.exports = app

// app.listen(PORT, console.log(`Server running on Port ${PORT}`))
=======
module.exports = app;
>>>>>>> test-investor
=======
module.exports = app;
>>>>>>> login-regist
