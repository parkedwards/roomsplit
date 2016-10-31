const Cluster = require('./../db/clusterModel');
const User = require('./../db/userModel');

const clusterController = {};

clusterController.createCluster = (req, res, next) => {
  let { username, clusterName } = req.body;
  Cluster.findOne({ clusterName: clusterName }, (err, foundCluster) => {
    if (foundCluster) next();
    else {
      let newCluster = new Cluster({ clusterName });
      newCluster.save((err) => {
        if (err) res.send(err);
        next();
      });
    }
  });
}

clusterController.joinCluster = (req, res, next) => {
  let { username, clusterName } = req.body;
  Cluster.findOne({ clusterName: clusterName }, (err, foundCluster) => {
    if (err) res.send(err);
    foundCluster.members.push(username);
    foundCluster.save();
    res.status(200).end();
  });
}

clusterController.pullCluster = (req, res, next) => {
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    let clusterToPull = foundUser.clusterName;
    Cluster.findOne({ clusterName: clusterToPull }, (err, foundCluster) => {
      res.status(200);
      res.send(JSON.stringify(foundCluster.members));
    })
  })
}


module.exports = clusterController;