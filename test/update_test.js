const assert = require("assert");
const User = require("../src/user.js");

describe("Update user records", () => {
	let joe;
	beforeEach(done => {
		joe = new User({ name: "Joe", likes: 0 });
		joe.save().then(() => done());
	});

	function assertName(operationPromise, done) {
		operationPromise.then(() => {
			User.find({}).then(users => {
				assert(users.length === 1);
				assert(users[0].name === "Alex");
				done();
			});
		});
	}

	it("Instance type using set n save", done => {
		joe.set("name", "Alex");
		assertName(joe.save(), done);
	});

	it("Model instance can update", done => {
		assertName(joe.update({ name: "Alex" }), done);
	});

	it("A model class can update", done => {
		assertName(User.update({ name: "Joe" }, { name: "Alex" }), done);
	});

	it("A model class can find and update one record", done => {
		assertName(User.findOneAndUpdate({ name: "Joe" }, { name: "Alex" }), done);
	});

	it("A model class can find with objectid and update", done => {
		assertName(User.findByIdAndUpdate(joe._id, { name: "Alex" }), done);
	});

	it("A user can have their postcount incremented by 1", done => {
		User.update({ name: "Joe" }, { $inc: { likes: 1 } })
			.then(() => User.findOne({ name: "Joe" }))
			.then(user => {
				assert(user.likes === 1);
				done();
			});
	});
});
