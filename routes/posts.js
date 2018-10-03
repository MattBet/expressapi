const express = require('express');

const router = require('express-promise-router')();

const PostsController = require('../controllers/posts');

const { validateParam,
        validateBody,
        schemas } = require('../helpers/routeHelpers.js');

router.route('/')
    .get(PostsController.index)
    .post(validateBody(schemas.postSchema),
          PostsController.newPost);

router.route('/:id')
    .get(validateParam(schemas.idSchema, 'id'),
         PostsController.getPost)
    .put([validateParam(schemas.idSchema, 'id'),
           validateBody(schemas.putPostSchema)],
           PostsController.replacePost)
    .patch([validateParam(schemas.idSchema, 'id'),
            validateBody(schemas.patchPostSchema)],
            PostsController.updatePost)
    .delete(validateParam(schemas.idSchema, 'id'),
            PostsController.deletePost);
module.exports = router;
