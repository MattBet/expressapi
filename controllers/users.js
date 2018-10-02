const User = require('../models/user');
const Post = require('../models/post');

const Joi = require('joi');

module.exports = {
    // Validation: DONE
    index: async (req, res, next) => {
        const users = await User.find({});
        res.status(200).json(users);
    },

    // Validation: DONE
    newUser: async (req, res, next) => {
        const newUser = new User(req.value.body);
        const user = await newUser.save();
        res.status(201).json(user);
    },

    // Validation: DONE
    getUser: async (req, res, next) => {
        const { id } = req.value.params;
        const user = await User.findById(id);
        console.log(user);
        res.status(200).json(user);
    },

    // Validation: DONE
    replaceUser: async (req, res, next) => {
        // enforce that req.body must contain all the fields
        const { id } = req.value.params;
        const newUser = req.value.body;
        const result = await User.findByIdAndUpdate(id, newUser);
        res.status(200).json({success: true});
    },

    // Validation: DONE
    updateUser: async (req, res, next) => {
        // req.body may contain any number of fields
        const { id } = req.value.params;
        const newUser = req.value.body;
        const result = await User.findByIdAndUpdate(id, newUser);
        res.status(200).json({success: true});
    },

    deleteUser: async (req, res, next) => {
        const { id } = req.params;
        const result = await User.findByIdAndRemove(id);
        res.status(200).json({success: true});
    },

    // Validation: DONE
    getUserPosts: async (req, res, next) => {
        const { id } = req.value.params;
        const user = await User.findById(id).populate('posts');
        res.status(201).json(user.posts);
    },

    // Validation: DONE
    newUserPost: async (req, res, next) => {
        const { id } = req.value.params;
        // Create a new post
        const newPost = new Post(req.value.body);
        // Get user
        const user = await User.findById(id);
        // Assign
        newPost.author = user;
        // Save the post
        await newPost.save();
        // Add post to the user's posts
        user.posts.push(newPost);
        // Save the user
        await user.save();
        res.status(201).json(newPost);
    }
};

/*

1) Callbacks
2) Promises
3) [X] Async/Await (Promises)

 */