var express = require('express');
var router = express.Router();
const Joueur = require('../models/joueur');
const Evenement = require('../models/evenement');

/* GET joueurs listing. */
router.get('/', function(req, res, next) {
	Joueur.find().sort('-date_creation').exec(function(err, joueurs) {
		if (err) {
			return next(err);
		}
		res.send(joueurs);
	});
});

router.get('/emails', function(req, res, next) {
	Joueur.find().sort('email').exec(function(err, joueurs) {
		if (err) {
			return next(err);
		}
		var emails = "";
		Object.keys(joueurs).forEach(function(joueur){
			if(joueurs[joueur].email != undefined){
				emails = emails + joueurs[joueur].email + ",";
			}		
		})
		res.send(emails);
	});
});

/* GET joueur by id */
router.get('/:id', loadJoueur, function(req, res, next) {
	res.send(req.joueur);
});

/* POST new joueur */
router.post('/', evenementEnCours, function(req, res, next) {
	// Create a new document from the JSON in the request body
	const newJoueur = new Joueur(req.body);

	newJoueur.date_creation = Date.now();
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

/* PATCH update joueur */
router.patch('/:id', loadJoueur, function(req, res, next) {

	if (req.body.pseudo !== undefined) {
		req.joueur.pseudo = req.body.pseudo;
	}
	if (req.body.prenom !== undefined) {
		req.joueur.prenom = req.body.prenom;
	}
	if (req.body.nom !== undefined) {
		req.joueur.nom = req.body.nom;
	}
	if (req.body.email !== undefined) {
		req.joueur.email = req.body.email;
	}

	req.joueur.save(function(err, savedJoueur) {
		if (err) {
			return next(err);
		}
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
	Joueur.findOne({"_id" : req.params.id}).exec(function(err, joueur) {
		if (err) {
			return next(err);
		} else if (!joueur) {
			return res.status(404).send('Aucun joueur trouvé avec cet identifiant : ' + req.params.id);
		}
		req.joueur = joueur;
		next();
	});
}

function evenementEnCours(req, res, next) {
	Evenement.findOne({$and: [{"date_debut": {$lt: Date.now()}},{"date_fin": {$gt: Date.now()}}]}).exec(function(err, evenement) {
		if (err) {
			return next(err);
		} else if (evenement) {
			req.body.evenement_id = evenement._id;
		}
		next();
	});
}

module.exports = router;
