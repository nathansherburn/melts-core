// SERVER VARIABLES
var port = process.env.PORT || 8080;


// EXPRESS MODULES
var express = require("express");
var app = express();


// DATABASE SETUP
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/melts-analytics");

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function (callback) {
	console.log("Database connected.")
});


// CUSTOM MODULES
var users = require("./routes/users");


// MIDDLEWARE
var bodyParser = require("body-parser");


// CUSTOM MIDDLEWARE DEFINITIONS
var whitelistByIp = function (req, res, next) {
	var whitelist = ["127.0.0.1","other.ips.here"];
	for (address in whitelist) {
		if (req.ip === whitelist[address]) return next();
	}
	res.status(401).send("Unauthorized")
};


// MIDDLEWARE IN USE
app.use(whitelistByIp);
app.use(bodyParser.json());
app.use('/users', users);


// Start server listening.
console.log("listening on " + port)
app.listen(port);

