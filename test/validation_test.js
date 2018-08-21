const assert = require("assert");
const User = require("../src/user.js");

describe("Validating user", done => {
	it("User name is required", done => {
		const user = new User({ name: undefined });
		const validationResult = user.validateSync();
		const { message } = validationResult.errors.name;
		assert(message === "Name is required");
		done();
	});

	it("Requires a user name longer than 2 characters", done => {
		const user = new User({ name: "al" });
		const valResult = user.validateSync();
		const { message } = valResult.errors.name;
		assert(message === "Name must be at least 3 characters.");
		done();
	});

	it("disallows invalid user from being saved.", done => {
		const user = new User({ name: "al" });
		user.save().catch(valResult => {
			const { message } = valResult.errors.name;
			assert(message === "Name must be at least 3 characters.");
			done();
		});
	});
});
