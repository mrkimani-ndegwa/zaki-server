require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');

// Local Imports
const Router = require('./routes');

// Config
const { PORT, NODE_ENV } = require("./config");
// Create App
const app = express();

app.set('port', PORT);
app.use(logger('tiny'));

app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res)=>{
    res.send({msg: "Welcome home! Confirm API Version to continue."})
});

// Routes
app.use('/api/v1', Router);

// Middleware(s)
app.use((req, res, next) => {
  const err = new Error(`${req.method} ${req.url} Not Found`);
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});


app.listen(PORT, () => {
  console.log(
    `Express Server started on Port ${app.get(
      'port'
    )} | Environment : ${NODE_ENV}`
  );
});