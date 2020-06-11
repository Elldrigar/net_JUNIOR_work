const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');
const request = require('request');
const config = require('config');

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

// @route   POST api/profile
// @desc    Create or update user profile
// @Access  Private
router.post(
	'/',
	[
		auth,
		[
			check('status', 'Status zawodowy jest wymagany')
				.not()
				.isEmpty(),
			check('skills', 'Umiejętności są wymagane')
				.not()
				.isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if(!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			company,
			website,
			location,
			bio,
			status,
			githubusername,
			skills,
			youtube,
			facebook,
			twitter,
			instagram,
			linkedin
		} = req.body;

		//Build profile object
		const profileFields = {};
		profileFields.user = req.user.id;
		if (company) profileFields.company = company;
		if (website) profileFields.website = website;
		if (location) profileFields.location = location;
		if (bio) profileFields.bio = bio;
		if (status) profileFields.status = status;
		if (githubusername) profileFields.githubusername = githubusername;
		if (skills) {
			profileFields.skills = skills.split(',').map(skill => skill.trim());
		}
		//Build social object
		profileFields.social = {}
		if (youtube) profileFields.social.youtube = youtube;
		if (twitter) profileFields.social.twitter = twitter;
		if (facebook) profileFields.social.facebook = facebook;
		if (linkedin) profileFields.social.linkedin = linkedin;
		if (instagram) profileFields.social.instagram = instagram;

		try {
			let profile = await Profile.findOne({ user: req.user.id });
			if(profile) {
				profile = await Profile.findOneAndUpdate(
					{ user: req.user.id },
					{ $set: profileFields },
					{ new: true}
				);
				return res.json(profile);
			}
			//Create profile
			profile = new Profile(profileFields);
			await profile.save();
			res.json(profile);

		} catch(err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route   GET api/profile
// @desc    Get all profiles
// @Access  Public
router.get('/', async (req, res) => {
	try {
		const profiles = await Profile.find().populate('user', ['name', 'avatar']);
		res.json(profiles);
	} catch(err) {
		console.error(err.message);
		res.status(500).send('Server Error!')
	}
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @Access  Public
router.get('/user/:user_id', async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);

		if (!profile) {
			return res.status(400).json({ msg: 'Brak profilu dla tego użytkownika' });
		}
		res.json(profile);
	} catch (err) {
		console.error(`Error while particular user profile : ${err.message}`);
		if (err.name == 'CastError') {
			return res.status(400).json({ msg: 'Brak profilu dla tego użytkownika' });
		}
		res.status(500).send('Server Error!');
	}
});

// @route   DELETE api/profile
// @desc    Delete profile and user
// @Access  Private
router.delete('/', auth, async (req, res) => {
	try {
		// *** REMOVE USERS POSTS *** //
		await Post.deleteMany({ user: req.user.id });
		// *** REMOVE PROFILE *** //
		await Profile.findOneAndRemove({ user: req.user.id });
		// *** REMOVE USER *** //
		await User.findOneAndRemove({ _id: req.user.id });
		res.json({ msg: 'Użytkownik usunięty!'});
	} catch(err) {
		console.error(err.message);
		res.status(500).send('Server Error!')
	}
});

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @Access  Private
router.put(
	'/experience',
	auth,
	[
		check('title', 'Nazwa jest wymagana').not().isEmpty(),
		check('company', 'Nazwa firmy jest wymagana').not().isEmpty(),
		check('from', 'Data rozpoczęcia jest wymagana').not().isEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			title,
			company,
			location,
			from,
			to,
			current,
			description
		} = req.body;

		const newExp = {
			title,
			company,
			location,
			from,
			to,
			current,
			description
		}

		try {
			const profile = await Profile.findOne({ user: req.user.id });
			profile.experience.unshift(newExp);
			await profile.save();
			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error!');
		}
	}
);

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @Access  Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });
		const removeIndex = profile.experience
			.map(item => item.id)
			.indexOf(req.params.exp_id);
		profile.experience.splice(removeIndex, 1);
		await profile.save();
		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error!');
	}
});

// @route   PUT api/profile/education
// @desc    Add profile education
// @Access  Private
router.put(
	'/education',
	auth,
	[
		check('school', 'Szkoła jest wymagana').not().isEmpty(),
		check('degree', 'Stopień jest wymagany').not().isEmpty(),
		check('fieldofstudy', 'Kierunek studiów jest wymagany').not().isEmpty(),
		check('from', 'Data rozpoczęcia jest wymagana').not().isEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			school,
			degree,
			fieldofstudy,
			from,
			to,
			current,
			description
		} = req.body;

		const newEdu = {
			school,
			degree,
			fieldofstudy,
			from,
			to,
			current,
			description
		}

		try {
			const profile = await Profile.findOne({ user: req.user.id });
			profile.education.unshift(newEdu);
			await profile.save();
			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error!');
		}
	}
);

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @Access  Private
router.delete('/education/:edu_id', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });
		const removeIndex = profile.education
			.map(item => item.id)
			.indexOf(req.params.edu_id);
		profile.education.splice(removeIndex, 1);
		await profile.save();
		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error!');
	}
});

// @route   GET api/profile/github/:username
// @desc    Get user repo's from Github
// @Access  Public
router.get('/github/:username', (req, res) => {
	try {
		const options = {
			uri: encodeURI(
				`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
			),
			method: 'GET',
			headers: {
				'user-agent': 'node.js',
				Authorization: `token ${config.get('githubToken')}`
			}
		};
		request(options, (error, response, body) => {
			if (error) console.error(error);
			if (response.statusCode !== 200) {
				return res.status(404).json({ msg: 'Github profil nie znaleziony'});
			}
			res.json(JSON.parse(body));
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error!');
	}
});

module.exports = router;