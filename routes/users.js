var express = require("express");
var router = express.Router();

var User = require("../models/user");

router.use(function(req, res, next) {
	console.log(req.method + ": users" + req.url)
	next();
});

router.route("/")
	.post(function (req, res) {
		var user = new User();
		user.username = req.body.username;
		user.email = req.body.email;
		user.save(function (err) {
			if (err) res.send(err);
			res.json(user);
		});
	})

	.get(function (req, res) {
		User.find()
		.exec(function (err, users) {
			if (err) res.send(err);
			console.log(users)
			res.json(users);
		});
	})

module.exports = router;