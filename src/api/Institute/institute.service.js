const institute_model = require('./institute.model').Institute;
const response_handler = require('../../middlewares/response_handler');
const logger = require('../../utils/logger')(__filename);
const ObjectId = require('mongodb').ObjectID;

class InstituteService {

	static save_institute = async (data) => {
		try {
			const response = await institute_model.create(data);
			logger.debug('created insitute', response);
			return response_handler.success(response);
		} catch (err) {
			logger.info('error occurred in save_institute');
			logger.error('error in save_institute', err);
			return response_handler.errorHandler('Internal_Server_Error');
		}
	};
	static update_institute = async (data) => {
		try {
			const response = await institute_model.findOneAndUpdate({
				_id: ObjectId(data._id),
			},
				data
			);
			logger.debug('response of update', response);
			return response_handler.success({
				id: response._id,
			});
		} catch (error) {
			// console.log(error);
			logger.info('error occurred in update_institute');
			logger.error('error in update_institute', error);
			return response_handler.errorHandler('Internal_Server_Error');
		}
	};
	static get_institutes = async (param, data) => {
		try {
			let response;
			let count;
			if (param && param.offset && param.limit) {
				response = await institute_model
					.find(data)
					.sort({
						_id: 'asc',
					})
					.skip(param.offset)
					.limit(param.limit);
				count = await institute_model.countDocuments(data);
			} else {
				response = await institute_model
					.find(data)
					.sort({
						_id: 'asc',
					});
				count = response.length;
			}
			logger.debug('response in get institutes', response);
			return response_handler.success({
				institutes: response,
				total_counts: count
			});
		} catch (err) {
			logger.info('error occurred in get_institutes');
			logger.error('error in get_institutes', err);
			return response_handler.errorHandler('Internal_Server_Error');
		}
	};
	static get_institute = async (param) => {
		try {
			const response = await institute_model.findOne({
				_id: ObjectId(param.id)
			});
			logger.debug('response at get_institute', response);
			return response_handler.success({
				institute: response,
			});
		} catch (err) {
			console.log(err);
			logger.info('error occurred in get_institute');
			logger.error('error in get_institute', err);
			return response_handler.errorHandler('Internal_Server_Error');
		}
	};
}

module.exports = InstituteService;