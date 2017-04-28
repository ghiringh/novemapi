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
		niveau: Number,
		question: String,
		propositions: {
			reponse: String,
			score: {
				business:Number,
				coding: Number,
				communication : Number,
				management : Number,
				marketing : Number,
				multimedia: Number
			},
			competence: String
		}
	},
	
	date_creation: {
		type: Date,
		default: Date.now
	}
	
});

module.exports = mongoose.model('Etape', etapeSchema);