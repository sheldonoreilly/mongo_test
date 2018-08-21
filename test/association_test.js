const mongoose = require("mongoose");
const assert = require("assert");
const User = require("../src/user");
const Comment = require("../src/comment");
const BlogPost = require("../src/blogPost");

describe("Assocations", done => {
	let joe, blogPost, comment;

	beforeEach(done => {
		joe = new User({ name: "Joe" });
		blogPost = new BlogPost({ title: "JS is great", content: "Aint it great!" });
		comment = new Comment({ content: "Congrats on great content" });

		// mongoose is doing some magic here - even though we are pushing the 'whole post/comment'
		// mongoose is actually only storing the ObjectId for us
		joe.blogPosts.push(blogPost);
		blogPost.comments.push(comment);
		comment.user = joe;

		// here it gets a bit tricky - the saves are async (promises).  so we need to know when the last of // the save operations are complete to be able to call 'done'
		Promise.all([joe.save(), blogPost.save(), comment.save()]).then(() => done());
	});

	it("saves a relation between a user and a blogpost", done => {
		User.findOne({ name: "Joe" })
			.populate("blogPosts")
			.then(user => {
				assert(user.blogPosts[0].title === "JS is great");
				done();
			});
	});

	it("saves full elational graph", done => {
		User.findOne({ name: "Joe" })
			.populate({
				path: "blogPosts",
				populate: {
					path: "comments",
					model: "comment",
					populate: {
						path: "user",
						model: "user"
					}
				}
			})
			.then(user => {
				// console.log(user.blogPosts[0].comments[0]);
				assert(user.name === "Joe");
				assert(user.blogPosts[0].title === "JS is great");
				assert(user.blogPosts[0].comments[0].content === "Congrats on great content");
				assert(user.blogPosts[0].comments[0].user.name === "Joe");
				done();
			});
	});
});
