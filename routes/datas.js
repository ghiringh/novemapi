var express = require('express');
var seeder = require('mongoose-seeder'),
	data = require('../data.json');

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

router.post('/',function(req, res, next) {
 
	seeder.seed(data).then(function(dbData) {
		res.sendStatus(204);
	}).catch(function(err) {
		return next(err);
	});
});

module.exports = router;
