const mongoose = require("mongoose");
const assert = require("assert");
const User = require("../src/user");
const BlogPost = require("../src/blogPost");

describe("Assocations", done => {
	let joe, blogPost;

	beforeEach(done => {
		joe = new User({ name: "Joe" });
		blogPost = new BlogPost({ title: "JS is great", content: "Aint it great!" });

		// mongoose is doing some magic here - even though we are pushing the 'whole post/comment'
		// mongoose is actually only storing the ObjectId for us
		joe.blogPosts.push(blogPost);

		// here it gets a bit tricky - the saves are async (promises).  so we need to know when the last of // the save operations are complete to be able to call 'done'
		Promise.all([joe.save(), blogPost.save()]).then(() => done());
	});

	it("users clean up blogposts on remove", done => {
		joe.remove()
			.then(() => BlogPost.count())
			.then(count => {
				assert(count === 0);
				done();
			});
	});
});
