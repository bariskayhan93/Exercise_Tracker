const Express = require("express");
const router = Express.Router();
const shortid = require("shortid");
const Exercise = require("../models/Exercise");
const User = require("../models/User");

// Short URL Generator
router.post("/:_id/exercises", async (req, res) => {
  let newSession = new Exercise({
    description: req.body.description,
    duration: parseInt(req.body.duration),
    date: req.body.date
  });
  User.findByIdAndUpdate(
    req.params._id,
    { $push: { log: newSession } },
    { new: true },
    (err, update) => {
      if (!err) {
        let resObj = {};
        resObj._id = update.id;
        resObj.username = update.username;
        resObj.description = newSession.description;
        resObj.duration = newSession.duration;
        resObj.date = new Date(newSession.date).toDateString();
        res.json(resObj);
      }
    }
  );

});

module.exports = router;
