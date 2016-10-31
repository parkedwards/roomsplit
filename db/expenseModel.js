const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  username: {type: String, required: true},
  expenseDate : { type: Date, required: true },
  expenseName : { type: String, required: true },
  expenseAmount : { type: Number, required: true }
});

module.exports = mongoose.model('Expense', expenseSchema);