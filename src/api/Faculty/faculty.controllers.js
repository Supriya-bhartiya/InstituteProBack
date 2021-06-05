const httpStatus = require('../../../node_modules/http-status');
const FacultyService = require('./faculty.service');
const logger = require('../../utils/logger')(__filename);

const createFaculty = async (req, res, next) => {
	try {
		let params = req.body;
		const response = await FacultyService.save_faculty(params);
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
const updateFaculty = async (req, res, next) => {
	try {
		let params = req.body;
		const response = await FacultyService.update_faculty(params);
		if (response.status == 200) {
			return res.status(httpStatus.OK).json(response);
		} else {
			return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(response);
		}
	} catch (err) {
		next(err);
	}
};
const getFaculties = async (req, res, next) => {
	try {
		const param = {};
		param.offset = Math.max(0, req.query.offset) || 0;
		param.limit = Math.max(0, req.query.limit) || 10000;
		const query = {
			isActive:true
		}
		const response = await FacultyService.get_faculties(param, query);
		if (response.status == 200) {
			return res.status(httpStatus.OK).json(response);
		} else {
			return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(response);
		}
	} catch (e) {
		next(e);
	}
};
const getFaculty = async (req, res, next) => {
	try {
		const param = {
			id:req.params.id
		};
		const response = await FacultyService.get_faculty(param);
		if (response.status == 200) {
			return res.status(httpStatus.OK).json(response);
		} else {
			return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(response);
		}
	} catch (e) {
		next(e);
	}
};
const removeFaculty = async (req, res, next) => {
	try {
		let params = {
			_id:req.body.id,
			isActive:false
		}
		const response = await FacultyService.update_faculty(params);
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
	createFaculty,
	updateFaculty,
	getFaculties,
	getFaculty,
	removeFaculty
};