const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'post'
    }]
});

const User = mongoose.model('user', userSchema);
module.exports = User;