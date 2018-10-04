const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');

const AuthController = require('../controllers/auth');
const { validateParam,
        validateBody,
        schemas } = require('../helpers/routeHelpers.js');

router.route('/signup')
    .post(validateBody(schemas.authSchema),
          AuthController.signUp);

router.route('/signin')
    .post(validateBody(schemas.authSchema), passport.authenticate('local', { session: false }), AuthController.signIn);

router.route('/secret')
    .get(passport.authenticate('jwt', { session: false }), AuthController.secret);

module.exports = router;