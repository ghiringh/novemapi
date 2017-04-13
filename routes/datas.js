var express = require('express');

const Etape = require('../models/etape');
const Evenement = require('../models/evenement');
const Joueur = require('../models/joueur');
const Score = require('../models/score');
const Staff = require('../models/staff');

var router = express.Router();

router.delete('/', function(req, res, next) {
	Etape.remove({}, function(err) { 
		if(err){
			return next(err);
		}
	});
	Evenement.remove({}, function(err) { 
		if(err){
			return next(err);
		}
	});
	Joueur.remove({}, function(err) { 
		if(err){
			return next(err);
		}
	});
	Score.remove({}, function(err) { 
		if(err){
			return next(err);
		}
	});
	Staff.remove({}, function(err) { 
		if(err){
			return next(err);
		}
		res.sendStatus(204);
	});
	
});

module.exports = router;
