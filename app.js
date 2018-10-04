const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config();

// Connection to DB
mongoose.connect('mongodb://localhost/apiexpress', { useNewUrlParser: true,
                                                     useCreateIndex: true });
mongoose.Promis = global.Promise;

const app = express();

// Load View Engine
app.set('view engine', 'pug');

// Set Public Folder
app.use(express.static('public'));

// Initialize Routes
const users = require('./routes/users');
const posts = require('./routes/posts');
const auth = require('./routes/auth');
const products = require('./routes/products');

// Middlewares
app.use(logger("dev"));
app.use(bodyParser.json());

// Routes
app.use('/users', users);
app.use('/posts', posts);
app.use('/auth', auth);
app.use('/products', products);

// Catch 404 Errors and forward them to error handler
app.use((req, res, next) => {
   const err = new Error('Not Found');
   err.status = 404;
   next(err);
});

// Error handler function
app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {};
    const status = error.status || 500;

    // Response the client
    res.status(status).json({
        error: {
            message: error.message
        }
    });

    // Response to ourselves
    console.error(err);
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));