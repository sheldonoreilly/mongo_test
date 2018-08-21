const assert = require("assert");
const User = require("../src/user");
describe("Creating records", () => {
	it("Saves a user", done => {
		// assert(true);
		const joe = new User({ name: "Joe" });

		joe.save().then(() => {
			assert(!joe.isNew);
			done();
		});
	});
});
