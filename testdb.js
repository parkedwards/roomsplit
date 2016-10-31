// use this as a template for your db files
// replace the 'roomsplitdb' with more specific db names
// dont forget to run mongod

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/roomsplitdb');

mongoose.connection.once('open', (err) => {
  if (err) console.log('there was an error connecting to db!');
  console.log('Connected with roomsplit DB');
});

const testSchema = new Schema({
  id: String,
  userName: String,
  password: String
});

const Test = mongoose.model('test', testSchema);

new Test({
  id: 1,
  userName: 'epark',
  password: 'password'
}).save((err) => {
  if (err) console.log('issue with 1');
});

new Test({
  id: 2,
  userName: 'kpark',
  password: 'password'
}).save((err) => {
  if (err) console.log('issue with 2');
});

new Test({
  id: 3,
  userName: 'cpark',
  password: 'password'
}).save((err) => {
  if (err) console.log('issue with 3');
});