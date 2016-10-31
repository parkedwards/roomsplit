const User = require('./../db/userModel');

const userController = {};

userController.createUser = (req, res, next) => {
  let { username, password, clusterName } = req.body;
  let newUser = new User({ username, password, clusterName });
  newUser.save((err) => {
    if (err) res.send(err);
    next();
  });
};

userController.verifyUser = (req, res, next) => {
  let { username, password } = req.body;
  User.findOne({ username: username }, (err, foundUser) => {
    if (err) res.send(err);
    if (!foundUser) res.status(404).end('no username!');
    else if (password !== foundUser.password) res.status(404).end('wrong password!');
    res.status(200).end();
  });
};


module.exports = userController;