const assert = require("assert");
const User = require("../src/user.js");

describe("Post (subdocument) tests", done => {
	it("can create a subdocument", done => {
		const joe = new User({
			name: "Joe",
			posts: [{ title: "Post Title" }]
		});
		joe.save().then(() => {
			User.findOne({ name: "Joe" }).then(user => assert(user.posts[0].title === "Post Title"));
			done();
		});
	});

	it("can add subdocuments to an existing record", done => {
		const joe = new User({ name: "Joe", posts: [] });
		joe.save().then(() => {
			User.findOne({ name: "Joe" })
				.then(user => {
					user.posts.push({ title: "new_post" });
					return user.save();
				})
				.then(() => User.findOne({ name: "Joe" }))
				.then(joe => {
					assert(joe.posts[0].title === "new_post");
					done();
				});
		});
	});

	it("can remove subdocuments to an existing record", done => {
		const joe = new User({ name: "Joe", posts: [{ title: "deletethispost" }] });
		joe.save().then(() => {
			User.findOne({ name: "Joe" })
				.then(user => {
					//in vanialla js this is a pain = findindex->splice
					//mongoose gives an alternative
					// find the exact post and call remove
					user.posts[0].remove();
					return user.save();
				})
				.then(() => User.findOne({ name: "Joe" }))
				.then(joe => {
					assert(joe.posts.length === 0);
					done();
				});
		});
	});
});
