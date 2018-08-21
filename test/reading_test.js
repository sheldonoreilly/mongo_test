const assert = require("assert");
const User = require("../src/user");

describe("Reading user from database", () => {
	let alex, joe, maria, zack;
	beforeEach(done => {
		alex = new User({ name: "Alex" });
		joe = new User({ name: "Joe" });
		maria = new User({ name: "Maria" });
		zack = new User({ name: "Zack" });
		Promise.all([alex.save(), joe.save(), maria.save(), zack.save()]).then(() => {
			done();
		});
	});

	it("Finds all users with name of Joe", done => {
		User.find({ name: "Joe" }).then(users => {
			//objectids are not raw strings they have an ObjectId() wrapper
			//we need to compare the raw strings - so we use the toString() method
			assert(joe._id.toString() === users[0]._id.toString());
			done();
		});
	});

	it("Find a user with a particular id", done => {
		User.findOne({ _id: joe._id }).then(user => {
			assert(user.name === "Joe");
			done();
		});
	});

	it("can read and skip and limit some result set", done => {
		User.find({})
			.sort({ name: 1 })
			.skip(1)
			.limit(2)
			.then(users => {
				assert(users[0].name === "Joe");
				assert(users[1].name === "Maria");
				assert(users.length === 2);
			});
		done();
	});
});
