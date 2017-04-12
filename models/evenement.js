var validator = require('validator');
const mongoose = require('mongoose');
const Staff = require('../models/staff');
const Schema = mongoose.Schema;

// Define the schema for scores
const evenementSchema = new Schema({
	nom:{
		type: String, 
		required: true,
		maxlength:[ 40, 'Le nom de l\'événement est trop long' ]
	},
	staff_id:{
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Staff',
		validate: existingStaff
	},
	date_debut:{
		type: Date,
		required: true,
	},
	date_fin:{
		type: Date,
		required: true,
	},

	// date de la création de l'évènement
	date_creation: {
		type: Date,
		required: true,
		default: Date.now
	},
	details: [{ 
		objectif: String, 
		description: String, 
		public: String, 
		remarque: String
	}]
	
});
/**
 * fonction qui valide si le staff existe, via son id
 */
function existingStaff(value, callback) {
  Joueur.findOne({ '_id': value }, function (err, staff){
    if (staff){
      callback(true);
    } else {
      callback(false);
    }
  });
}

// Create the model from the schema and export it
module.exports = mongoose.model('Evenement', evenementSchema);