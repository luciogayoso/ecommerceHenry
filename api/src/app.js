const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const cors = require('cors');
const session= require('express-session');
const passport= require('passport')
const server = express();
//const googleStratergy = require('./googleStrategy');

require('./db.js');
require('./passportConfig')
//server.use(cors());
server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));

server.use(session({
  secret:'iniciarSesion', 
  resave:false, 
  saveUninitialized:true,
  // cookie:{maxAge: 60000 }
}))
//server.use(googleStratergy());
server.use(cookieParser('iniciarSesion'));
server.use(passport.initialize())
server.use(passport.session());


server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://accounts.google.com/'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


const corsOptions = {
  origin: 'http://localhost:3006',
  // credentials : true
}

server.use(cors(corsOptions));


server.use('/', routes);
server.use('/',(req,res)=>{
  req.session.username= req.body.username
  req.session.save();
  res.end()
})

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
