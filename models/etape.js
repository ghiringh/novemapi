var validator = require('validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const etapeSchema = new Schema({

	niveau: {
		type: Number,
		required: true
	},

	question: {
		type: String,
		required: true,
		minlength: [ 2, 'La question est trop courte' ],
		maxlength: [ 1000, 'Le pseudo est trop long' ]
	},

	propositions: {
		type: Array,
		required: true,
		minlength: [ 2, 'La proposition est trop courte' ],
		maxlength: [ 1000, 'La proposition est trop longue' ]
	},
	
	date_creation: {
		type: Date,
		default: Date.now
	}
	
});

module.exports = mongoose.model('Etape', etapeSchema);