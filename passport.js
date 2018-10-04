const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');

// JWT STRATEGY
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: process.env.JWT_SECRET
}, async (payload, done) => {
    try {
        // Find the user specified in token
        const user = await User.findById(payload.sub);
        // If user doesn't exist HANDLER
        if (!user) {
            return done(null, false);
        }
        // return the user
        done(null, user);
    } catch(err) {
        done(err, false);
    }
}));

// LOCAL STRATEGY
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    // Find the user
    const user = User.findOne({ email });
    // If user doesn't exist HANDLER
    if (!user)
        return done(null, false);
    // Check password

    // Check incorrect password

    // return the user
}));