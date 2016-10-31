const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// maybe add bcrypt
const userSchema = new Schema({
  username: { type: String, required: true, unique: true, minlength: 1 },
  password: { type: String, required: true, minlength: 1 },
  clusterName: { type: String, required: true }
});


module.exports = mongoose.model('User', userSchema);