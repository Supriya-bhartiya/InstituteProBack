//Require Mongoose
const mongoose = require('mongoose');
const ObjectId = require('../../../node_modules/mongodb').ObjectID;

//Define a schema
const Schema = mongoose.Schema;

const Subject = new Schema({
	name:String,
	code:String,
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
    }
});
const Course = new Schema({
	name:String,
	subjects:[{
		name:String,
		subjectId:ObjectId
	}],
	instituteName:String,
	instituteId:ObjectId,
	duration:Number,
	courseFee:Number,
	batchsize:Number,
	// faculties:[{
	// 	facultyName:String,
	// 	subjectName:String,
	// 	facultyId:ObjectId
	// }],
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

module.exports.Subject = mongoose.model('Subject', Subject);
module.exports.Course = mongoose.model('Course', Course);