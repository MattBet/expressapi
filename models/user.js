const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'post'
    }]
});

userSchema.pre('save', async function(next) {
    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(10);

        // Generate a hash (+salt)
        const passwordHash = await bcrypt.hash(this.password, salt);

        // Assigning hashed password
        this.password = passwordHash;
        next();
    } catch(err) {
        next(err);
    }
});
const User = mongoose.model('user', userSchema);
module.exports = User;