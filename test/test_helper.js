const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

before(done => {
	mongoose.connect("mongodb://localhost/users_test");
	mongoose.connection
		.once("open", () => {
			done();
		})
		.on("error", error => {
			console.warn("Error", error);
			done();
		});
});

beforeEach(done => {
	mongoose.connection.collections.users.drop(() => {
		//es6 - collections is an object and es6 pulls off the propeties and assigns
		//them to exxact named variables
		const { users, comments, blogposts } = mongoose.connection.collections;
		users.drop(() => {
			comments.drop(() => {
				blogposts.drop(() => {
					done();
				});
			});
		});
	});
});
