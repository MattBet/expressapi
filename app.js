const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

// Connection to DB
mongoose.connect('mongodb://localhost/apiexpress', { useNewUrlParser: true });

const app = express();

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const users = require('./routes/users');
const posts = require('./routes/posts');

// Middlewares
app.use(logger("dev"));
app.use(bodyParser.json());

// Routes
app.use('/users', users);
app.use('/posts', posts);

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
const port = app.get('port') || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));