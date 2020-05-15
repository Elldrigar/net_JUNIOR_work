const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

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
	// See if user exist

	// Get user gravatar

	// Encrypt password

	//return Json webtoken
		
	res.send('User route');
});

module.exports = router;