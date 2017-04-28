var validator = require('validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const etapeSchema = new Schema({

	question: {
		type: String,
		required: true,
		minlength: [ 2, 'La question est trop courte' ],
		maxlength: [ 1000, 'Le pseudo est trop long' ]
	},
	/*propositions: {
		required : true,
		data: [
			{
				type:String
			}
		]
	}*/

	propositions: {
		niveau: {type: Number},
		question: {type: String},
		propositions: [{
			reponse: {type: String},
			score: {
				business:{type: Number},
				coding: {type: Number},
				communication : {type: Number},
				management : {type: Number},
				marketing : {type: Number},
				multimedia: {type: Number}
			},
			competence: {type: Number}
		}]
	},
	
	date_creation: {
		type: Date,
		default: Date.now
	}
	
});

module.exports = mongoose.model('Etape', etapeSchema);