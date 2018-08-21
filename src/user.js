//this is the user model - a model contains the schema
//schema describes the instance {string, string, etc}
//represents all the data in a single collection in our database

const mongoose = require("mongoose");
const PostSchema = require("./posts");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String,
		required: [true, "Name is required"],
		validate: {
			validator: name => name.length > 2,
			message: "Name must be at least 3 characters."
		}
	},
	//has an array of postSchemas (embedded/subdocuments)
	//each of those posts need to follow the post schema
	posts: [PostSchema],
	likes: Number,
	blogPosts: [
		{
			type: Schema.Types.ObjectId,
			ref: "blogPost"
		}
	]
});

//we are using 'function' as opposes to '=>' because we want this
// pointing to the model instance.  i.e. this === joe
UserSchema.virtual("postCount").get(function() {
	return this.posts.length;
});

UserSchema.pre("remove", function(next) {
	//get the model from mogoose - dont 'require' it above, this can lead to
	//cyclcle imports!!!!
	const BlogPost = mongoose.model("blogPost");
	BlogPost.remove({ _id: { $in: this.blogPosts } }).then(() => next());
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
