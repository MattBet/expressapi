const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    message: String,
    created_at: Date,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});

const Post = mongoose.model('post', postSchema);
module.exports = Post;