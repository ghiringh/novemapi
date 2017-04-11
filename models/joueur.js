var validator = require('validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define the schema for joueurs
const joueurSchema = new Schema({



	pseudo: {
		type: String,
		required: true,
		minlength: [ 2, 'Le pseudo est trop court' ],
		maxlength: [ 20, 'Le pseudo est trop long' ]
	},

	prenom: {
		type: String,
		minlength: [ 2, 'Le prenom est trop court' ],
		maxlength: [ 20, 'Le prenom est trop long' ]
	},

	nom: {
		type: String,
		minlength: [ 2, 'Le nom est trop court' ],
		maxlength: [ 20, 'Le nom est trop long' ]
	},

	email: {
		type: String,
		unique: 'L\'adresse email est requise',
		lowercase: 'L\'adresse email ne peut pas contenir de caratère majuscule',
		minlength: [ 5, 'L\'adresse email est trop courte' ],
		maxlength: [ 60, 'L\'email est trop longue' ],
		validate: [ validator.isEmail, 'L\'adresse email n\'est pas valide' ]
	},

	score_id: {
		type: Number,
	}, 
	
	event_id: {
		type: Number,
	},

	date_creation: {
		type: Date,
		default: Date.now
	}
	
});

module.exports = mongoose.model('Joueur', joueurSchema);