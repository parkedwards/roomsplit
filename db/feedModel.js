const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedSchema = new Schema({
  username: { type: String, required: true, unique: true },
  feedData: { type: Array, default: [] }
});

module.exports = mongoose.model('Feed', feedSchema);