const mongoose = require('mongoose');
const User = require('./userModel');
const Schema = mongoose.Schema;


const clusterSchema = new Schema({
  clusterName: { type: String, required: true, unique: true },
  members: {type: Array, default: [] }
  // members: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('Cluster', clusterSchema);