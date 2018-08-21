const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//create the new schema
const BlogPostSchema = new Schema({
	title: String,
	content: String,
	//ref:Comment - refers to the string value given to the mongoose model
	comments: [{ type: Schema.Types.ObjectId, ref: "comment" }]
});

const BlogPost = mongoose.model("blogPost", BlogPostSchema);

module.exports = BlogPost;
