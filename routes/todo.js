const Express = require('express');
const router = Express.Router();
const shortid = require('shortid');
const Exercise = require('../models/Exercise');
const User = require('../models/User');


// Short URL Generator
router.post('/:_id/exercises', async (req, res) => {
  const taskId = req.body[':_id'];
  const description= req.body.description
  const duration= req.body.duration
  const date= req.body.date
  console.log(req.body)
  if (taskId) {
    try {
      let user = await User.findOne({ _id:taskId });
      let task;
      console.log(user)
      let username=user.username;
      if (user) {
        task = new Exercise({
          taskId,
          description,
          duration,
          date,
          username
        });

        await task.save();
        res.json(task);
      } else {
        res.json(
          "not found"
        );

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