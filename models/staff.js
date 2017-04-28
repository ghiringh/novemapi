var validator = require('validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

const staffSchema = new Schema({

	prenom: {
		type: String,
		required: true,
		minlength: [ 2, 'Le prenom est trop court' ],
		maxlength: [ 20, 'Le prenom est trop long' ]
	},

	nom: {
		type: String,
		required: true,
		minlength: [ 2, 'Le nom est trop court' ],
		maxlength: [ 20, 'Le nom est trop long' ]
	},

	email: {
		type: String,
		required: true,
		unique: 'L\'adresse email est requise',
		lowercase: 'L\'adresse email ne peut pas contenir de caratère majuscule',
		minlength: [ 5, 'L\'adresse email est trop courte' ],
		maxlength: [ 60, 'L\'email est trop longue' ],
		validate: [ validator.isEmail, 'L\'adresse email n\'est pas valide' ]
	},

	password: {
		type: String,
		required: true,
	},

	date_creation: {
		type: Date,
		default: Date.now
	}
	
}).plugin(uniqueValidator);

module.exports = mongoose.model('Staff', staffSchema);