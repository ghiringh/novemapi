var validator = require('validator');
const mongoose = require('mongoose');
const Joueur = require('../models/joueur');
const Schema = mongoose.Schema;

// Define the schema for scores
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
	joueur:{
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Joueur',
		validate: existingJoueur
	},

	// date de la création du score
	date_creation: {
		type: Date,
		required: true,
		default: Date.now
	}
	
});
/**
 * fonction qui valide si le joueur existe, via son id
 */
function existingJoueur(value, callback) {
	Joueur.findOne({ '_id': value }, function (err, joueur){
		if (joueur){
			callback(true);
		} else {
			callback(false);
		}
	});
}

// Create the model from the schema and export it
module.exports = mongoose.model('Score', scoreSchema);