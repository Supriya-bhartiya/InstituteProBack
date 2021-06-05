//Require Mongoose
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;

//Define a schema
const Schema = mongoose.Schema;

const Institute = new Schema({
	name:String,
	mobile:String,
    landline:String,
	addressLine1:String,
	addressStreet:String,
	addressCity:String,
	addressState:String,
	addressPincode:String,
	addressCountry:String,
	licenceNo:String,
	licenceYear:String,
	courses:[{
		name:String,
		batchsize:Number,
		courseFee: Number,
		duration:Number,
		courseId:ObjectId
	}],
	faculties:[{
		name:String,
		subjectName:String,
		facultyId:ObjectId
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
module.exports.Institute = mongoose.model('Institute', Institute);