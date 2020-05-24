const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   POST api/posts
// @desc    Create a post
// @Access  Private
router.post(
	'/',
	[
		auth,
		[
		check('text', 'Tekst jest wymagany')
			.not()
			.isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if(!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		try {
			const user = await User.findById(req.user.id).select('-password');
			const newPost = new Post({
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id
			});
			const post = await newPost.save();
			return res.json(post);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error!')
		}
	}
);

// @route   GET api/posts
// @desc    Get all posts
// @Access  Private
router.get('/', auth, async (req, res) => {
	try {
		const posts = await Post.find().sort({ date: -1 });
		return res.json(posts);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error!')
	}
});

// @route   GET api/posts/:id
// @desc    Get post by ID
// @Access  Private
router.get('/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post) {
			return res.status(404).json({ msg: 'Post nie znaleziony' });
		}
		return res.json(post);
	} catch (err) {
		console.error(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Postu nie znaleziono'} );
		}
		res.status(500).send('Server Error!')
	}
});

// @route   DELETE api/posts/:id
// @desc    Delete a post
// @Access  Private
router.delete('/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post) {
			return res.status(404).json({ msg: 'Postu nie znaleziono'} );
		}
		if (post.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'Uzytkownik nie autoryzowany' });
		}
		await post.remove();
		return res.json({ msg: 'Post usuniety' });
	} catch (err) {
		console.error(err.message);
		if (err.name === 'CastError') {
			return res.status(404).json({ msg: 'Postu nie znaleziono!'} );
		}
		res.status(500).send('Server Error!')
	}
});

// @route   PUT api/posts/like/:id
// @desc    Like a post
// @Access  Private
router.put('/like/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
			return res.status(400).json({ msg: 'Post juz polubileś!' });
		}
		post.likes.unshift({ user: req.user.id });
		await post.save();
		return res.json(post.likes);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   PUT api/posts/unlike/:id
// @desc    unLike a post
// @Access  Private
router.put('/unlike/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
			return res.status(400).json({ msg: 'Post jeszcze nie polubileś!' });
		}
		post.likes = post.likes.filter(({ user }) => user.toString() !== req.user.id);
		await post.save();
		return res.json(post.likes);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   POST api/posts/comment/:id
// @desc    Comment on a post
// @Access  Private
router.post(
	'/comment/:id',
	[
		auth,
		[
			check('text', 'Tekst jest wymagany')
				.not()
				.isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if(!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		try {
			const user = await User.findById(req.user.id).select('-password');
			const post = await Post.findById(req, params.is);
			const newComment = {
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id
			};
			post.comments.unshift(newComment);
			await post.save();
			return res.json(post.comments);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error!')
		}
	}
);

module.exports = router;