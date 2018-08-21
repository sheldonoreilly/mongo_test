const assert = require("assert");
const User = require("../src/user.js");

describe("Virtual tests", done => {
	it("test postCount", done => {
		const joe = new User({ name: "Joe", posts: [{ title: "post" }] });
		joe.save().then(() => {
			User.findOne({ name: "Joe" }).then(user => {
				assert(user.postCount === 1);
				done();
			});
		});
	});
});
