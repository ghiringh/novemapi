var validator = require('validator');
const mongoose = require('mongoose');
const Staff = require('../models/staff');
const Schema = mongoose.Schema;

const evenementSchema = new Schema({
	nom:{
		type: String, 
		required: true,
		maxlength:[ 40, 'Le nom de l\'événement est trop long' ]
	},/*
	staff_id:{
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Staff',
		validate: existingStaff
	},*/
	date_debut:{
		type: Date,
		required: true,
		validate: dateDebut
	},
	date_fin:{
		type: Date,
		required: true,
		validate: dateFin
	},

	date_creation: {
		type: Date,
		default: Date.now
	},
	details: { 
		objectifs: {
			type: String,
			required: false,
			maxlength:[ 200, 'Les objectifs sont trop longs' ]
		},
		description: {
			type: String,
			required: false,
			maxlength:[ 1000, 'La description est trop longue' ]
		}, 
		public: {
			type: String,
			required: false,
			maxlength:[ 200, 'Le public est trop long' ]
		}, 
		remarques: {
			type: String,
			required: false,
			maxlength:[ 1000, 'Les remarques sont trop longues' ]
		}
	}
	
});

function dateDebut(value) {
	return value >= Date.now();
}

function dateFin(value) {
	return value > this.date_debut;
}

function existingStaff(value, callback) {
	Staff.findOne({ '_id': value }, function (err, staff){
		if (staff){
			callback(true);
		} else {
			callback(false);
		}
	});
}

module.exports = mongoose.model('Evenement', evenementSchema);