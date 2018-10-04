const JWT = require('jsonwebtoken');
const User = require('../models/user');

signToken = user => {
    return JWT.sign({
        iss: 'MattBet',
        sub: user._id,
        iat: new Date().getTime(), //current time
        exp: new Date().setDate(new Date().getDate() + 1) //current time + 1 day ahead
    }, process.env.JWT_SECRET);
};

module.exports = {
    signUp: async (req, res, next) => {
        const { firstName,
                lastName,
                email,
                password } = req.value.body;

        // Check if there is a user with the same email
        const foundUser = await User.findOne({ email });
        if (foundUser)
            return res.status(403).json({ error: "Email is already in use" });

        // Create a new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            password
        });
        await newUser.save();

        // Generate the token
        const token = signToken(newUser);

        // Respond with token
        res.status(200).json({ token: token });
    },

    signIn: async (req, res, next) => {
        // Generate a token
        console.log('UsersController.signIn() called', req.body);
    },

    secret: async (req, res, next) => {
        console.log('Here!');
    }
};