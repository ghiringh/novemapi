var validator = require('validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define the schema for users
const userSchema = new Schema({

	email: {
		type: String, // Type validation
		required: true,
		unique: 'L\'adresse email est requise',
		lowercase: 'L\'adresse email ne peut pas contenir de caratère majuscule',
		minlength: [ 5, 'L\'adresse email est trop courte' ], // Minimum length
		maxlength: [ 60, 'L\'email est trop longue' ], // Maximum length
		validate: [ validator.isEmail, 'L\'adresse email n\'est pas valide' ]
	},

	score: {
		type: Number,
	}, 
	
	// date de la création de l'utilisateur
	createdAt: {
		type: Date,
		default: Date.now
	}
	
});

// Create the model from the schema and export it
module.exports = mongoose.model('User', userSchema);