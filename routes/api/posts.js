const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

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
		
	});

module.exports = router;