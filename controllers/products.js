const Product = require('../models/product');

module.exports = {
    index: async (req, res, next) => {
        const products = await Product.find({});
        res.status(200).json(products);
    },

    newProduct: async (req, res, next) => {
        // Create a new Product
        const newProduct = req.value.body;

        const product = new Product(newProduct);

        await product.save();

        res.status(200).json(product);
    },

    getProduct: async (req, res, next) => {
        const product = await Product.findById(req.value.params.id);
        res.status(200).json(product);
    },

    replaceProduct: async (req, res, next) => {
        // enforce that req.body must contain all the fields
        const { id } = req.value.params;
        const newProduct = req.value.body;
        const result = await Product.findOneAndUpdate(id, newProduct);
        res.status(200).json({ success: true });
    },

    updateProduct: async (req, res, next) => {
        const { id } = req.value.params;
        const newProduct = req.value.body;
        const result = await Product.findOneAndUpdate(id, newProduct);
        res.status(200).json({ success: true });
    },

    deleteProduct: async (req, res, next) => {
        const { id } = req.params;
        const result = await Product.findByIdAndRemove(id);
        res.status(200).json({success: true});
    }
};