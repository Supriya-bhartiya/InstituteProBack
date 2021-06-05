const httpStatus = require('../../../node_modules/http-status');
const CourseService = require('./course.service');
const logger = require('../../utils/logger')(__filename);
const common = require('../../constants/constants.common');
const subjects = [
	{
		name: 'Physics',
		code: "PHY"
	},
	{
		name: 'Chemistry',
		code: "CHEM"
	},
	{
		name: 'Mathematics',
		code: "MATH"
	},
	{
		name: 'Biology',
		code: "BIO"
	},
	{
		name: 'Java',
		code: "java"
	},
	{
		name: 'C',
		code: "C"
	},
	{
		name: 'C++',
		code: "CPP"
	},
	{
		name: 'English',
		code: "eng"
	},
	{
		name: 'Current',
		code: "GEN"
	},
	{
		name: 'Quant',
		code: "QUANT"
	}
]


const saveSubject = async () => {
	try {
		const courseData = [];
		if (subjects.length > 0) {
			const response = await CourseService.save_subject(subjects);
			if (response.status == 200) {
				console.log('subjects Created and Ready for Use');
			} else {
				console.log('Database Not Ready for Use');
			}
		} else {
			console.log('Please create subject');
		}
	} catch (err) {
		console.log('err', err);
	}
};
const getSubjects = async (req, res, next) => {
	try {
		const param = {};
		param.offset = Math.max(0, req.query.offset) || 0;
		param.limit = Math.max(0, req.query.limit) || 10000;
		const query = {
			isActive: true,
		}
		const response = await CourseService.get_subjects(param, query);
		if (response.status == 200) {
			return res.status(httpStatus.OK).json(response);
		} else {
			return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(response);
		}
	} catch (e) {
		next(e);
	}
};
const getSubject = async (req, res, next) => {
	try {
		const param = {};
		param.id = req.params.id;
		const response = await CourseService.get_subject(param);
		if (response.status == 200) {
			return res.status(httpStatus.OK).json(response);
		} else {
			return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(response);
		}
	} catch (e) {
		next(e);
	}
};
const createCourse = async (req, res, next) => {
	try {
		let params = req.body;
		const response = await CourseService.save_course(params);
		if (response.status == 200) {
			return res.status(httpStatus.OK).json(response);
		} else if (response.status == 204 || response.status == 409) {
			return res.status(httpStatus.CONFLICT).json(response);
		} else {
			return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(response);
		}
	} catch (err) {
		next(err);
	}
};
const getCourses = async (req, res, next) => {
	try {
		const param = {};
		param.offset = Math.max(0, req.query.offset) || 0;
		param.limit = Math.max(0, req.query.limit) || 10000;
		const query = {
			isActive: true,
		}
		const response = await CourseService.get_courses(param, query);
		if (response.status == 200) {
			return res.status(httpStatus.OK).json(response);
		} else {
			return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(response);
		}
	} catch (e) {
		next(e);
	}
};
const getCourse = async (req, res, next) => {
	try {
		const param = {};
		param.id = req.params.id;
		const response = await CourseService.get_course(param);
		if (response.status == 200) {
			return res.status(httpStatus.OK).json(response);
		} else {
			return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(response);
		}
	} catch (e) {
		next(e);
	}
};
const updateCourse = async (req, res, next) => {
	try {
		let params = req.body;
		const response = await CourseService.update_course(params);
		if (response.status == 200) {
			return res.status(httpStatus.OK).json(response);
		} else {
			return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(response);
		}
	} catch (err) {
		next(err);
	}
};
const removeCourse = async (req, res, next) => {
	try {
		let params = {
			_id:req.body.id,
			isActive:false
		}
		const response = await CourseService.update_course(params);
		if (response.status == 200) {
			return res.status(httpStatus.OK).json(response);
		} else {
			return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(response);
		}
	} catch (err) {
		next(err);
	}
};

module.exports = {
	getSubjects,
	getSubject,
	saveSubject,
	createCourse,
	getCourses,
	getCourse,
	updateCourse,
	removeCourse
};