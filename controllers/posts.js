const Post = require('../models/post');
const User = require('../models/user');

module.exports = {
    // Validation : PENDING
    index: async (req, res, next) => {
        const posts = await Post.find({});
        res.status(200).json(posts);
    },

    // Validation : DONE
    newPost: async (req, res, next) => {
        console.log(req.value);
        // Find current user/author
        const author = await User.findById(req.value.body.author);

        // Create a new Post
        const newPost = req.value.body;
        delete newPost.author;

        const post = new Post(newPost);
        post.author = author; // Assign author to post

        await post.save();

        // Add newly created post to the current user
        author.posts.push(post);
        await author.save();

        res.status(200).json(post);
    },

    // Validation : DONE
    getPost: async (req, res, next) => {
        const post = await Post.findById(req.value.params.id);
        res.status(200).json(post);

    },

    // Validation : DONE
    replacePost: async (req, res, next) => {
        // enforce that req.body must contain all the fields
        const { id } = req.value.params;
        const newPost = req.value.body;
        const result = await Post.findOneAndUpdate(id, newPost);
        res.status(200).json({ success: true });
    },

    // Validation : DONE
    updatePost: async (req, res, next) => {
        const { id } = req.value.params;
        const newPost = req.value.body;
        const result = await Post.findOneAndUpdate(id, newPost);
        res.status(200).json({ success: true });
    },


    // Validation : DONE
    deletePost: async (req, res, next) => {
        const { id } = req.value.params;

        // Get post
        const post = await Post.findById(id);
        if (!post)
            return res.status(404).json({ error: "Post doesn't exist"});

        const authorId = post.value.author;

        // Get author
        const author = await User.findById(authorId);

        // Remove the post
        await post.remove();

        // Remove post from the author's post list
        author.posts.pull(post);
        await author.save();

        res.status(200).json({ success: true});


        console.log(post);
    }
};