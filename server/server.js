const express = require('express');
const path = require('path');
const fs = require('fs');
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



/////////////////////////////////////////
// POST REQUESTS
app.post('/signup', createUser, createCluster, joinCluster);
app.post('/login', verifyUser);
app.post('/expense', addExpense);
app.post('/pullFeed', showFeed);
app.post('/pullCluster', pullCluster);





app.listen(3000, () => {
  console.log('server up and running on 3000');
});