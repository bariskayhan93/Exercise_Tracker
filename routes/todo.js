var Express = require("express");
var router = Express.Router();
var User = require("../models/User");

// Short URL Generator
router.post('/:_id/exercises', (req, res) => {
  let id = req.params._id;
  let duration = parseInt(req.body.duration);
  let date = 
  req.body.date === "" || req.body.date === undefined
    ? new Date().toDateString()
    : new Date(Date.parse(req.body.date)).toDateString();

  if (req.body.description == '') {
    return res.send('Invalid description');
  }

  if (!duration && duration !== 0) {
    return res.send('Invalid duration');
  }

  User.findByIdAndUpdate(id, {
    $push: {
      log: {
        description: req.body.description,
        duration: duration,
        date: date
      }
    }
  }, {new: true}, (err, user) => {
    if (err) {
      console.log(err);
      return res.send(err.message);
    }
    console.log('PUSH: ', user._id);
    res.json({
      username: user.username,
      description: req.body.description,
      duration: parseInt(req.body.duration),
      date: date,
      _id: user._id
    });

  });
});

module.exports = router;
