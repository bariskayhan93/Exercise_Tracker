const Express = require('express');
const router = Express.Router();
const shortid = require('shortid');
const User = require('../models/User');



router.get('/users', async (req,res)=>{
  User.find({},function(err,users){
    var userMap={};

    users.forEach(function(user){
      userMap[user._id]=user;
    })
    res.send(Array(userMap))
  })
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