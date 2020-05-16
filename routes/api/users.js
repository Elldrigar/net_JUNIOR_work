const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcryot = require('bcryptjs');

// @route   POST api/users
// @desc    Register user
// @Access  Public
router.post(
	'/',
	[
	 check('name', 'Imię jest wymagane')
		 .not()
		 .isEmpty(),
	 check('email', 'Podaj poprawny email')
		 .isEmail(),
	 check('password', 'Podaj Hasło min. 8 znaków')
		 .isLength({ min:8 })
],
	(req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	const { name, email, password } = req.body;
	try {
		// See if user exist
		let user = await User.findOne( { email });
		if (user) {
			res.status(400).json({ errors: [ {msg: 'User already exist'}] });
		}

		// Get user gravatar
		const avatar = gravatar.url(email, {
			s: '200',
			r: 'pg',
			d: 'mm'
		})

		user = new user({
			name,
			email,
			avatar,
			password
		})
		// Encrypt password
		const salt = await bcryot.genSalt(10);
		user.password = await bcrypt.hash(password, salt);
		//return Json webtoken

		res.send('User route');
	} catch(err) {
		console.error(err.message);
		res.status(500).send('Server Error!')
	}
});

module.exports = router;