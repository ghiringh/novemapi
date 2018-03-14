var express = require('express');
var router = express.Router();
const Evenement = require('../models/evenement');

/* GET liste evenement  */
router.get('/', function(req, res, next) {
Evenement.find().sort('date_debut').exec(function(err, evenements) {
	if (err) {
		return next(err);
	}
	res.send(evenements);
	});
});

/* GET evenement by id */
router.get('/:id', loadEvenement, function(req, res, next) {
	res.send(req.evenement);
});

/* POST new evenement */
router.post('/', checkPlageLibre,function(req, res, next) {
	// Create a new document from the JSON in the request body
	const newEvenement = new Evenement(req.body);

	newEvenement.date_creation = Date.now();

	// Save that document
	newEvenement.save(function(err, savedEvenement) {
	if (err) {
		return next(err);
	}
	// Send the saved document in the response
	res.status(201);
	res.send(savedEvenement);
	});
});

/* PATCH update evenement */
router.patch('/:id', loadEvenement, checkPlageLibre, function(req, res, next) {

	if (req.body.nom !== undefined) {
		req.evenement.nom = req.body.nom;
	}
	if (req.body.staff !== undefined) {
		req.evenement.staff = req.body.staff;
	}
	if (req.body.date_debut !== undefined) {
		req.evenement.date_debut = req.body.date_debut;
	}
	if (req.body.date_fin !== undefined) {
		req.evenement.date_fin = req.body.date_fin;
	}
	if (req.body.details !== undefined) {
		req.evenement.details = req.body.details;
	}

	req.evenement.save(function(err, savedEvenement) {
		if (err) {
			return next(err);
		}
		res.send(savedEvenement);
	});
});

/* DELETE delete evenement */
router.delete('/:id', loadEvenement, function(req, res, next) {

	req.evenement.remove(function(err) {
		if (err) {
			return next(err);
		}
		res.sendStatus(204);
	});
});

function loadEvenement(req, res, next) {
	Evenement.findOne({"_id" : req.params.id}).exec(function(err, evenement) {
		if (err) {
			return next(err);
		} else if (!evenement) {
			return res.status(404).send('Aucun evenement trouvé avec cet identifiant : ' + req.params.id);
		}
		req.evenement = evenement;
		next();
	});
}

function checkPlageLibre(req, res, next){
	Evenement.findOne(
		{$and: [
			{$or:[
				{"date_debut": {$lte: req.body.date_debut}, "date_fin": {$gt: req.body.date_debut}},
				{"date_debut": {$lt: req.body.date_fin}, "date_fin": {$gte: req.body.date_fin}},
				{"date_debut": {$gte: req.body.date_debut}, "date_fin": {$lte: req.body.date_fin}}
			]},
			{"_id": {$ne: req.params.id}}
		]
	}).exec(function(err, evenement) {
		if (err) {
			return next(err);
		} else if (evenement) {
			return res.status(404).send('La plage n\'est pas libre et contient déjà un autre événement');
		}
		req.evenement = evenement;
		next();
	});
}

module.exports = router;
