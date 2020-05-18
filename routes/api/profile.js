const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validation } = require('express-validator');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   GET api/profile/me
// @desc    Get current users profile
// @Access  Private
router.get('/me', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.user.id
		}).populate('user', ['name', 'avatar']);

		if (!profile) {
			return res.status(400).json({ msg: 'Nie ma profilu tego użytkownika' });
		}

		res.json(profile);
	} catch(err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;