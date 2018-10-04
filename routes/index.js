const express = require('express');

const router = require('express-promise-router')();

router.get('/', async (req, res, next) => {
    res.status(200).json({ success: true });
});

module.exports = router;