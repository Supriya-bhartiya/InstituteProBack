const httpStatus = require('http-status');
const InstituteService = require('./institute.service');
const logger = require('../../utils/logger')(__filename);


const createInstitute = async (req, res, next) => {
	try {
		let params = req.body;
		const response = await InstituteService.save_institute(params);
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
const updateIntitute = async (req, res, next) => {
	try {
		let params = req.body;
		const response = await InstituteService.update_institute(params);
		if (response.status == 200) {
			return res.status(httpStatus.OK).json(response);
		} else {
			return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(response);
		}
	} catch (err) {
		next(err);
	}
};
const getInstitutes = async (req, res, next) => {
	try {
		const param = {};
		param.offset = Math.max(0, req.query.offset) || 0;
		param.limit = Math.max(0, req.query.limit) || 10000;
		const query = {
			isActive: true
		}
		const response = await InstituteService.get_institutes(param, query);
		if (response.status == 200) {
			return res.status(httpStatus.OK).json(response);
		} else {
			return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(response);
		}
	} catch (e) {
		next(e);
	}
};
const getInstitute = async (req, res, next) => {
	try {
		const param = {
			id: req.params.id
		};
		const response = await InstituteService.get_institute(param);
		if (response.status == 200) {
			return res.status(httpStatus.OK).json(response);
		} else {
			return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(response);
		}
	} catch (e) {
		next(e);
	}
};

const removeInstitute = async (req, res, next) => {
	try {
		let params = {
			_id:req.body.id,
			isActive:false
		}
		const response = await InstituteService.update_institute(params);
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
	createInstitute,
	updateIntitute,
	getInstitutes,
	getInstitute,
	removeInstitute
};