var Express = require('express');
var router = Express.Router();
var User = require('../models/User');


router.get('/api/users', (req, res) => {
  User.find({})
    .select(({
      _id: 1,
      username: 1,
    }))
    .exec((err, users) => {
      if (err) {
        console.log(err);
        return res.send('Error: Could not process the request');
      }

      res.json(users);
    });
});
router.get('/api/users/:_id/logs', (req, res) => {
  let id = req.params._id;
  let _from = req.query.from;
  let to = req.query.to;
  let limit = parseInt(req.query.limit);
  let fromDate = new Date(_from);
  let toDate = new Date(to);

  const REGEX = /[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}/i;

  if (!REGEX.test(_from) || fromDate.toDateString() === 'Invalid Date') {
    fromDate = undefined;
  }

  if (!REGEX.test(to) || toDate.toDateString() === 'Invalid Date') {
    toDate = undefined;
  }

  User.findById(id, (err, user) => {
      if (err) {
        console.log(err);
        return res.send(err.message);
      }

      if (!user) {
        return res.send('Invalid user id');
      }
      //console.log('BEFORE SORT');
      user.log.sort((log1, log2) => log1.date.getTime() - log2.date.getTime());

      let start = 0;
      let end = user.log.length;

      //console.log('AFTER SORT');
      if (fromDate) {
        for (let i = 0; i < user.log.length; i += 1) {
          if (user.log[i].date.getTime() >= fromDate.getTime()) {
            start = i;
            break;
          }
        }
      }

      //console.log('AFTER FROM DATE');
      if (toDate) {
        for (let i = start; i < user.log.length; i += 1) {
          if (user.log[i].date.getTime() >= toDate.getTime()) {
            end = i;
            break;
          }
        }
      }

      //console.log('AFTER TO DATE');
      user.log = user.log.slice(start, end);
      if (limit) {
        user.log = user.log.slice(0, limit);
      }

      //console.log('AFTER LIMIT');
      let filteredLog = user.log.map((curr) => {
        return {
          description: curr.description,
          duration: curr.duration,
          date: curr.date.toDateString()
        }
      });

      //console.log('AFTER FILTERED LOG');
      res.json({
        username: user.username,
        _id: user._id,
        count: filteredLog.length,
        log: filteredLog
      });

      console.log('LOGS: ', fromDate, toDate, limit, {
        username: user.username,
        _id: user._id,
        count: filteredLog.length,
        log: filteredLog
      }, '\n\n');
    });
});

/*
router.get('/users/:_id/logs', async (req,res)=>{
  let taskId = req.params._id;
  console.log(taskId)
  let user = await User.findOne({ _id:taskId });
  let exc = await Exercise.find({ ObjectID:taskId });
  console.log(user)
  console.log(exc)
  let filteredLogs = []
  let retFil= exc.filter(x=>
    filteredLogs.push({description:x.description,duration:x.duration,date:x.date})
    )

res.send({_id:taskId,username:user.username,count:filteredLogs.length,log:filteredLogs})
})*/


// Short URL Generator
router.post('/users', async (req, res) => {
  let {username} = req.body;
  console.log(username)
  if (username) {
    try {
      let user = await User.findOne({ username });
      if (user) {
        res.json(user);
      }else {

        user = new User({
          username
        });

        await user.save();
        res.json(user);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json('Server Error');
    }
  } else {
    res.json({
      "error": "invalid URL"
    });
  }
});

module.exports = router;