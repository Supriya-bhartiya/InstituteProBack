//Require Mongoose
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;

//Define a schema
const Schema = mongoose.Schema;

const Student = new Schema({
	name:String,
	dob:Date,
	mobile:Number,
	addressLine1:String,
	addressStreet:String,
	addressCity:String,
	addressState:String,
	addressPincode:String,
	addressCountry:String,
	fatherName:String,
	fathersOccupation:String,
	fatherMobile:Number,
	motherName:String,
	mothersOccupation:String,
	motherMobile:Number,
	instituteId:ObjectId,
	institutionName:String,
	courseName:String,
	courseId:ObjectId,
	enrolmentStartDate:Date,
	enrolmentEndDate:Date,
	isEnrolled:Boolean,
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

module.exports.Student = mongoose.model('Student', Student);