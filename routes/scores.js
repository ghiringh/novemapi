var express = require('express');
var router = express.Router();
const Score = require('../models/score');

/* GET score  */
router.get('/', function(req, res, next) {
Score.find().sort('id').exec(function(err, scores) {
	if (err) {
		return next(err);
	}
	res.send(scores);
	});
});

/* GET score by id */
router.get('/:id', loadScore, function(req, res, next) {
	res.send(req.score);
});

/* POST new score */
router.post('/', function(req, res, next) {
	// Create a new document from the JSON in the request body
	const newScore = new Score(req.body);

	newScore.date_creation = Date.now();
	// Save that document
	newScore.save(function(err, savedScore) {
	if (err) {
		return next(err);
	}
	// Send the saved document in the response
	res.status(201);
	res.send(savedScore);
	});
});

/* PATCH update score */
router.patch('/phase1/:id', loadScore, function(req, res, next) {

	if (req.body.business !== undefined) {
		req.score.business += req.body.business;
	}
	if (req.body.management !== undefined) {
		req.score.management += req.body.management;
	}
	if (req.body.marketing !== undefined) {
		req.score.marketing += req.body.marketing;
	}
	if (req.body.coding !== undefined) {
		req.score.coding += req.body.coding;
	}
	if (req.body.multimedia !== undefined) {
		req.score.multimedia += req.body.multimedia;
	}
	if (req.body.communication !== undefined) {
		req.score.communication += req.body.communication;
	}

	req.score.save(function(err, savedScore) {
		if (err) {
			return next(err);
		}
		res.send(savedScore);
	});
});

/* PATCH update score */
router.patch('/phase2/:id', loadScore, function(req, res, next) {

	if (req.body.business !== undefined) {
		req.score.business += 2 * req.body.business;
	}
	if (req.body.management !== undefined) {
		req.score.management += 2 * req.body.management;
	}
	if (req.body.marketing !== undefined) {
		req.score.marketing += 2 * req.body.marketing;
	}
	if (req.body.coding !== undefined) {
		req.score.coding += 2 * req.body.coding;
	}
	if (req.body.multimedia !== undefined) {
		req.score.multimedia += 2 * req.body.multimedia;
	}
	if (req.body.communication !== undefined) {
		req.score.communication += 2 * req.body.communication;
	}

	req.score.save(function(err, savedScore) {
		if (err) {
			return next(err);
		}
		res.send(savedScore);
	});
});

/* DELETE delete score */
router.delete('/:id', loadScore, function(req, res, next) {

	req.score.remove(function(err) {
		if (err) {
			return next(err);
		}
		res.sendStatus(204);
	});
});

function loadScore(req, res, next) {
	Score.findOne({"_id" : req.params.id}).exec(function(err, score) {
		if (err) {
			return next(err);
		} else if (!score) {
			return res.status(404).send('Aucun score trouvé avec cet identifiant : ' + req.params.id);
		}
		req.score = score;
		next();
	});
}

module.exports = router;
