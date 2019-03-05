var validator = require('validator');
const mongoose = require('mongoose');
const Joueur = require('../models/joueur');
const Schema = mongoose.Schema;

const scoreSchema = new Schema({

	business:{
		type: Number, 
		required: false,
		default: 2
	},
	gestion:{
		type: Number, 
		required: false,
		default: 2
	},
	management:{
		type: Number, 
		required: false,
		default: 2
	},
	communication:{
		type: Number, 
		required: false,
		default: 2
	},
	technique:{
		type: Number, 
		required: false,
		default: 2
	},
	conception:{
		type: Number, 
		required: false,
		default: 2
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
	
});

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