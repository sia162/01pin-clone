var express = require("express");
var router = express.Router();
const userModel = require("./users");
const postModel = require("./post");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/createuser", async function (req, res, next) {
  let createdUser = await userModel.create({
    username: "harshi",
    password: "harshi",
    posts: [],
    email: "harshi@gmail.com",
    fullName: "harshi vandana sharma",
  });

  res.send(createdUser);
});

router.get("/createpost", async function (req, res, next) {
  let createdpost = await postModel.create({
    postText: "this is my second post guys",
    user: "6586e95c7cbfe16e84f44a8e",
  });

  let user = await userModel.findOne({ _id: "6586e95c7cbfe16e84f44a8e" });
  user.posts.push(createdpost._id);
  await user.save();

  res.send("done");
});

router.get("/alluserposts", async function (req, res, next) {
  let user = await userModel
    .findOne({ _id: "6586e95c7cbfe16e84f44a8e" })
    .populate("posts");
  res.send(user);
});

module.exports = router;
