const express = require('express');
//const router = express.Router();
const router = require('express-promise-router')();

const UsersController = require('../controllers/users');

const { validateParam, validateBody, schemas } = require('../helpers/routeHelpers.js');

router.route('/')
    .get(UsersController.index)
    .post(validateBody(schemas.userSchema), UsersController.newUser);

router.route('/:id')
    .get(validateParam(schemas.idSchema, 'id'), UsersController.getUser)
    .put([validateParam(schemas.idSchema, 'id'),
          validateBody(schemas.userSchema)],
          UsersController.replaceUser)
    .patch([validateParam(schemas.idSchema, 'id'),
            validateBody(schemas.userOptionalSchema)],
            UsersController.updateUser)
    .delete(UsersController.deleteUser);

router.route('/:id/posts')
    .get(validateParam(schemas.idSchema, 'id'), UsersController.getUserPosts)
    .post([validateParam(schemas.idSchema, 'id'),
           validateBody(schemas.postSchema)],
           UsersController.newUserPost);

module.exports = router;