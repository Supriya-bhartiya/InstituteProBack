//Require Mongoose
const mongoose = require('mongoose');
const { string } = require('joi');
const ObjectId = require('../../../node_modules/mongodb').ObjectID;

//Define a schema
const Schema = mongoose.Schema;

const Faculty = new Schema({
	name:String,
	mobile:String,
	alternativeContactNo:String,
	subjectName:String,
	subjectId:ObjectId,
	institutes:[{
		name:String,
		instituteId:ObjectId
	}],
	qualifications:[{
		degreeName:String,
		passingYear:String,
		grade:String
	}],
	totalExperience:String,
	experiences:[{
		InstitutionName:String,
		from:String,
		to:String,
		isCurrent:Boolean
	}],
	isActive: {
		type: Boolean,
		default: true
	},
	createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});

module.exports.Faculty = mongoose.model('Faculty', Faculty);