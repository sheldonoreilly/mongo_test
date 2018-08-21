const assert = require("assert");
const User = require("../src/user");

describe("Delete a user", () => {
	let joe;
	beforeEach(done => {
		joe = new User({ name: "Joe" });
		joe.save().then(() => done());
	});

	it("instance remove", done => {
		joe.remove()
			.then(() => User.findOne({ name: "Joe" }))
			.then(user => {
				assert(user === null);
				done();
			});
	});

	it("Class method remove", done => {
		//remove a bunch of records with a given criteria
		User.remove({ name: "Joe" }).then(() => {
			User.findOne({ name: "Joe" }).then(user => {
				assert(user === null);
				done();
			});
		});
	});

	it("Class method findAndRemove", done => {
		User.findOneAndRemove({ name: "Joe" }).then(() => {
			User.findOne({ name: "Joe" }).then(user => {
				assert(user === null);
				done();
			});
		});
	});

	it("Model method findOneAndRemove", done => {
		//remove a bunch of records with a given criteria
		User.findByIdAndRemove({ _id: joe._id }).then(() => {
			User.findOne({ name: "Joe" }).then(user => {
				assert(user === null);
				done();
			});
		});
	});
});
