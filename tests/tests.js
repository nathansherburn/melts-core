var superagent = require("superagent");
var expect = require("expect.js");

describe("MeLTS REST API Server", function () {
	var id;

	// it("should check the api is online", function (done) {
	// 	superagent.get("http://localhost:8080/api")
	// 	.send()
	// 	.end(function (err, res) {
	// 		expect(err).to.eql(null);
	// 		expect(res.body.message).to.be.a("string")
	// 		done();
	// 	});
	// });

	it("should create a new user", function (done) {
		superagent.post("http://localhost:8080/users")
		.send({
			username: "John",
			email: "john.smith@monash.edu"
		})
		.end(function (err, res) {
			expect(err).to.eql(null);
			expect(res.body._id.length).to.eql(24);
			id = res.body._id;
			done();
		});
	});

	it("should retrieve all users", function (done) {
		superagent.get("http://localhost:8080/users")
		.send()
		.end(function (err, res) {
			expect(err).to.eql(null);
			done();
		});
	});

});