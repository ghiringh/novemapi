var validator = require('validator');
const mongoose = require('mongoose');
const Joueur = require('../models/joueur');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

// Define the schema for scores
const scoreSchema = new Schema({

	business:{
		type: int, 
		required: false,
		default: 0
	},
	management:{
		type: int, 
		required: false,
		default: 0
	},
	marketing:{
		type: int, 
		required: false,
		default: 0
	},
	coding:{
		type: int, 
		required: false,
		default: 0
	},
	multimedia:{
		type: int, 
		required: false,
		default: 0
	},
	communication:{
		type: int, 
		required: false,
		default: 0
	},
	joueur:{
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Joueur',
		validate: existingJoueur
	}

	// date de la création du score
	createdAt: {
		type: Date,
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
module.exports = mongoose.model('Score, scoreSchema);