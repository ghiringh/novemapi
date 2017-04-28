var validator = require('validator');
const mongoose = require('mongoose');
const Joueur = require('../models/joueur');
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

const scoreSchema = new Schema({

	business:{
		type: Number, 
		required: false,
		default: 0
	},
	management:{
		type: Number, 
		required: false,
		default: 0
	},
	marketing:{
		type: Number, 
		required: false,
		default: 0
	},
	coding:{
		type: Number, 
		required: false,
		default: 0
	},
	multimedia:{
		type: Number, 
		required: false,
		default: 0
	},
	communication:{
		type: Number, 
		required: false,
		default: 0
	},
	joueur_id:{
		type: Schema.Types.ObjectId,
		required: true,
		unique: 'Ce joueur possède déjà un score',
		ref: 'Joueur',
		validate: existingJoueur
	},


	date_creation: {
		type: Date,
		default: Date.now
	}
	
}).plugin(uniqueValidator);

function existingJoueur(value, callback) {
	Joueur.findOne({ '_id': value }, function (err, joueur){
		if (joueur){
			callback(true);
		} else {
			callback(false);
		}
	});
}

module.exports = mongoose.model('Score', scoreSchema);