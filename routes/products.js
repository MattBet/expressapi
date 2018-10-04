const express = require('express');

const router = require('express-promise-router')();

const ProductsController = require('../controllers/products');

const { validateParam,
    validateBody,
    schemas } = require('../helpers/routeHelpers.js');

router.route('/')
    .get(ProductsController.index)
    .post(validateBody(schemas.productSchema),
        ProductsController.newProduct);

router.route('/:id')
    .get(validateParam(schemas.idSchema, 'id'),
        ProductsController.getProduct)

    .put([validateParam(schemas.idSchema, 'id'),
            validateBody(schemas.putProductSchema)],
        ProductsController.replaceProduct)

    .patch([validateParam(schemas.idSchema, 'id'),
            validateBody(schemas.patchProductSchema)],
        ProductsController.updateProduct)

    .delete(validateParam(schemas.idSchema, 'id'),
        ProductsController.deleteProduct);
module.exports = router;
