var express = require('express');
var router = express.Router();
const Joueur = require('../models/joueur');

/* GET joueurs listing. */
router.get('/', function(req, res, next) {
Joueur.find().sort('id').exec(function(err, joueurs) {
	if (err) {
		return next(err);
	}
	res.send(joueurs);
	});
});

/* GET joueur by id */
router.get('/:id', loadJoueur, function(req, res, next) {
	res.send(req.joueur);
});

/* POST new joueur */
router.post('/', function(req, res, next) {
	// Create a new document from the JSON in the request body
	const newJoueur = new Joueur(req.body);

	newJoueur.createdAt = Date.now();
	// Save that document
	newJoueur.save(function(err, savedJoueur) {
	if (err) {
		return next(err);
	}
	// Send the saved document in the response
	res.status(201);
	res.send(savedJoueur);
	});
});

/* DELETE delete joueur */
router.delete('/:id', loadJoueur, function(req, res, next) {

	req.joueur.remove(function(err) {
		if (err) {
			return next(err);
		}
		res.sendStatus(204);
	});
});

function loadJoueur(req, res, next) {
	Joueur.findOne({"id" : req.params.id}).exec(function(err, joueur) {
		if (err) {
			return next(err);
		} else if (!joueur) {
			return res.status(404).send('Aucun utilisateur trouvé avec cet identifiant : ' + req.params.id);
		}
		req.joueur = joueur;
		next();
	});
}

module.exports = router;
