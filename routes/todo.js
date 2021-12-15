const Express = require("express");
const router = Express.Router();
const shortid = require("shortid");
const Exercise = require("../models/Exercise");
const User = require("../models/User");

// Short URL Generator
router.post("/:_id/exercises", async (req, res) => {
  const taskId = req.body[":_id"];
  const description = req.body.description;
  const duration =req.body.duration;
  const date = String(req.body.date === '' || req.body.date === undefined ? new Date() : new Date(Date.parse(req.body.date)).toDateString())
  console.log(taskId);
  if (taskId) {
    try {
      let user = await User.findOne({ _id: taskId });
      let task;
      let username = user.username;
      let _id = taskId;
      if (user) {
        task = new Exercise({
          task_id:_id,
          username,
          date,
          duration,
          description,
        });

        await task.save();
        res.json(task);
      } else {
        res.json("not found");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Server Error");
    }
  } else {
    res.json({
      error: "invalid URL",
    });
  }
  
});

module.exports = router;
