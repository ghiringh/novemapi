var validator = require('validator');
const mongoose = require('mongoose');
const Staff = require('../models/staff');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

// Define the schema for scores
const evenementSchema = new Schema({
	nom:{
		type: String, 
		required: false,
		maxlength:[ 20, 'Name too long' ]
	},
	staff:{
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Staff',
		validate: existingStaff
	},
	date_debut:{
		type: Date,
	},
	date_fin:{
		type: Date,
	},

	// date de la création de l'évènement
	createdAt: {
		type: Date,
		default: Date.now
	},
	details: [{ objectif: String, 
					description: String, 
					public: String, 
					remarque: String]
	
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
module.exports = mongoose.model('Evenement, evenementSchema);