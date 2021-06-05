const httpStatus = require('http-status');
const StudentService = require('./student.service');
const logger = require('../../utils/logger')(__filename);


const createStudent = async (req, res, next) => {
	try {
		let params = req.body;
		const response = await StudentService.save_student(params);
		if (response.status == 200) {
			return res.status(httpStatus.OK).json(response);
		} else if(response.status == 204 || response.status == 409){
			return res.status(httpStatus.CONFLICT).json(response);
		}else {
			return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(response);
		}
	} catch (err) {
		next(err);
	}
};
const updateStudent = async (req, res, next) => {
	try {
		let params = req.body;
		const response = await StudentService.update_student(params);
		if (response.status == 200) {
			return res.status(httpStatus.OK).json(response);
		} else {
			return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(response);
		}
	} catch (err) {
		next(err);
	}
};
const getStudents = async (req, res, next) => {
	try {
		const param = {};
		param.offset = Math.max(0, req.query.offset) || 0;
		param.limit = Math.max(0, req.query.limit) || 10000;
		const query = {
			isActive:true
		}
		const response = await StudentService.get_students(param, query);
		if (response.status == 200) {
			return res.status(httpStatus.OK).json(response);
		} else {
			return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(response);
		}
	} catch (e) {
		next(e);
	}
};
const getStudent = async (req, res, next) => {
	try {
		const param = {
			id:req.params.id
		};
		const response = await StudentService.get_student(param);
		if (response.status == 200) {
			return res.status(httpStatus.OK).json(response);
		} else {
			return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(response);
		}
	} catch (e) {
		next(e);
	}
};
const removeStudent = async (req, res, next) => {
	try {
		let params = {
			_id:req.body.id,
			isActive:false
		}
		const response = await StudentService.update_student(params);
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
	createStudent,
	updateStudent,
	getStudents,
	getStudent,
	removeStudent
};