const Express = require('express');
const router = Express.Router();
const shortid = require('shortid');
const User = require('../models/User');
const Exercise = require('../models/Exercise');


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
  const taskId = req.params._id;
  console.log(taskId)
  let user = await User.findOne({ _id:taskId });
  let exc = await Exercise.find({ taskId });
  console.log(user)
  console.log(exc)
  const filteredLogs = []
  const retFil= exc.filter(x=>
    filteredLogs.push({date:x.date,duration:x.duration,description:x.description})
    )
  console.log(retFil)
  console.log(filteredLogs)



res.send({_id:taskId,username:user.username,count:filteredLogs.length,log:filteredLogs})

 /* Exercise.find({},function(err,excs){
    var excMap={};

    excs.forEach(function(exc){
      excMap[user._id]=user;
    })
    res.send(Array(excMap))
  })*/
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