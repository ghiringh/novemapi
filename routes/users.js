var express = require('express');
var router = express.Router();
const User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
User.find().sort('email').exec(function(err, users) {
	if (err) {
		return next(err);
	}
	res.send(users);
	});
});

/* GET user by email */
router.get('/:email', loadUser, function(req, res, next) {
	res.send(req.user);
});

/* POST new user */
router.post('/', function(req, res, next) {
	// Create a new document from the JSON in the request body
	const newUser = new User(req.body);

	newUser.createdAt = Date.now();
	// Save that document
	newUser.save(function(err, savedUser) {
	if (err) {
		return next(err);
	}
	// Send the saved document in the response
	res.status(201);
	res.send(savedUser);
	});
});

/* DELETE delete user */
router.delete('/:email', loadUser, function(req, res, next) {

	req.user.remove(function(err) {
		if (err) {
			return next(err);
		}
		res.sendStatus(204);
	});
});

function loadUser(req, res, next) {
	User.findOne({"email" : req.params.email}).exec(function(err, user) {
		if (err) {
			return next(err);
		} else if (!user) {
			return res.status(404).send('Aucun utilisateur trouvé avec l\'email : ' + req.params.email);
		}
		req.user = user;
		next();
	});
}

module.exports = router;
