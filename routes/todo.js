var Express = require("express");
var router = Express.Router();
var Exercise = require("../models/Exercise");
var User = require("../models/User");

// Short URL Generator
router.post("/:_id/exercises",  (req, res)=> {
  let taskId = req.params._id;
  let description = req.body.description;
  let duration = req.body.duration;
  let date =
    req.body.date === "" || req.body.date === undefined
      ? new Date().toDateString()
      : new Date(Date.parse(req.body.date)).toDateString();

      User.findById({ _id:taskId}, ( error, user ) => {
        if ( error ) { return error }
       let username;
        let task;
        let _id = taskId;
          task = new Exercise({
            _id: taskId,
            username:user.username,
            date:date,
            duration,
            description,
          });
      
          task.save();
          res.json(task);
      });


 
});

module.exports = router;
