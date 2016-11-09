const express = require('express');
const path = require('path');
const fs = require('fs');
const qs = require('querystring');
const request = require("request");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');

/////////////////////////////////////////
// controller imports here
const { createUser, verifyUser } = require('./../controllers/userController');
const { joinCluster, createCluster, pullCluster } = require('./../controllers/clusterController');
const { createFeed, showFeed, addExpense } = require('./../controllers/feedController');


/////////////////////////////////////////
// Initialize your express server
const app = express();


/////////////////////////////////////////
// connect to your DB
mongoose.connect('mongodb://localhost/roomsplitdb');
mongoose.connection.once('open', (err) => {
  if (err) console.log('there was an error connecting to db!');
  console.log('Connected with roomsplit DB');
});

// to allow static file access
app.use('/', express.static('./../static/'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


/////////////////////////////////////////
// GET REQUESTS
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../bundle.js'));
});

//------------------------------------------//
// GitHub OAuth
// Initial request from user to use GH Login
app.get('/github/auth', (req, res) => {
  let url =
    'https://github.com/login/oauth/authorize?' +
    'scope=user&' +
    'redirect_uri=http://localhost:8080/github/callback&' +
    'client_id=f394b420cd7d1df4ddc0';
  res.redirect(url);
});

// After creds check out, GH redirects back through the client to the redirect URI
// + authorization code appended to the request body
// in order to get the authorization token
app.get('/github/callback', (req, res) => {
  // console.log('auth code', req.query.code);
  let tokenQuery = {
    client_id: 'f394b420cd7d1df4ddc0',
    client_secret: '7639e7787533d2b06f63c03ef8cf1928719e3137',
    code: req.query.code,
    accept: 'application/json'
  }

  let url = 'https://github.com/login/oauth/access_token?' + qs.stringify(tokenQuery);

  let options = {
    url: url,
    headers: {
      'user-agent': 'canbeanything' // required by GH API, can be ANY string
    },
    json: true
  };

  request(options, (err, resp, body) => {
    if (err) return res.send(500, err);
    console.log(body);
    res.cookie('token', body.access_token);
    
    let options = {
      url: 'https://api.github.com/user',
      headers: {
        'user-agent': 'canbeanything',
        'Accept': 'application/json',
        'Authorization': 'token ' + body.access_token
      },
      json: true
    };

    request(options, (err, resp, body) => {
      res.send(body);
    });
  });
});

app.get('*', (req, res) => {
  res.redirect('/');
})


/////////////////////////////////////////
// POST REQUESTS
app.post('/signup', createUser, createCluster, joinCluster);
app.post('/login', verifyUser);
app.post('/expense', addExpense);
app.post('/pullFeed', showFeed);
app.post('/pullCluster', pullCluster);

app.post('/test', (req, res) => {
  next();
})



app.listen(3000, () => {
  console.log('server up and running on 3000');
});