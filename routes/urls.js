var Express = require('express');
var router = Express.Router();
var shortid = require('shortid');
var User = require('../models/User');
var Exercise = require('../models/Exercise');


router.get('/users', async (req,res)=>{
  User.find({},function(err,users){
    var userMap={};

    users.forEach(function(user){
      userMap[user._id]=user;
    })
    res.send(users)
  })
})

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
  console.log(retFil)
  console.log(filteredLogs)



res.send({_id:taskId,username:user.username,count:filteredLogs.length,log:filteredLogs})
})


// Short URL Generator
router.post('/users', async (req, res) => {
  const {username} = req.body;
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