const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define the schema for users
const userSchema = new Schema({

	// firstName entre 2 et 20 caractères
	firstName: {
		type: String, // Type validation 
		minlength: [ 2, 'firstName is too short' ], // Minimum length
		maxlength: [ 20, 'firstName is too long' ] // Maximum length
	},

	// lastName entre 2 et 20 caractères
	lastName: {
		type: String, // Type validation 
		minlength: [ 2, 'minlength is too short' ], // Minimum length
		maxlength: [ 20, 'minlength is too long' ] // Maximum length
	},
	
	// date de la création de l'utilisateur
	createdAt: {
		type: Date,
		default: Date.now
	}
	
});

// Create the model from the schema and export it
module.exports = mongoose.model('User', userSchema);