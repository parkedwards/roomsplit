const Feed = require('./../db/feedModel');
const Expense = require('./../db/expenseModel');

const feedController = {};

// for new users
feedController.createFeed = (req, res, next) => {
  let { username } = req.body;
  Feed.create({ username })
    .then(() => res.redirect('/feed/' + username))
    .catch(() => res.status(400).end())
}

feedController.showFeed = (req, res, next) => {
  Expense.find({ username: req.body.username }, (err, foundFeeds) => {
    console.log(foundFeeds);
    res.status(200);
    res.send(JSON.stringify(foundFeeds));
  });
}

feedController.addExpense = (req, res, next) => {
  Expense.create(req.body)
    .then(() => {
      res.status(200).end();
    })
}

module.exports = feedController;