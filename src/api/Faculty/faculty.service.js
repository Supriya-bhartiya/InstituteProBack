const faculty_model = require('./faculty.model').Faculty;
const response_handler = require('../../middlewares/response_handler');
const logger = require('../../utils/logger')(__filename);
const ObjectId = require('../../../node_modules/mongodb').ObjectID;

class FacultyService {

	static save_faculty = async (data) => {
		try {
			const response = await faculty_model.create(data);
			logger.debug('created parking', response);
			return response_handler.success(response);
		} catch (err) {
			logger.info('error occurred in save_faculty');
			logger.error('error in save_faculty', err);
			return response_handler.errorHandler('Internal_Server_Error');
		}
	};
	static update_faculty = async (data) => {
		try {
			const response = await faculty_model.findOneAndUpdate({
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
			logger.info('error occurred in update_faculty');
			logger.error('error in update_faculty', error);
			return response_handler.errorHandler('Internal_Server_Error');
		}
	};
	static get_faculties = async (param, data) => {
		try {
			let response;
			let count;
			if (param && param.offset && param.limit) {
				response = await faculty_model
					.find(data)
					.sort({
						_id: 'asc',
					})
					.skip(param.offset)
					.limit(param.limit);
				count = await faculty_model.countDocuments(data);
			} else {
				response = await faculty_model
					.find(data)
					.sort({
						_id: 'asc',
					});
				count = response.length;
			}
			logger.debug('response in get faculties', response);
			return response_handler.success({
				faculties: response,
				total_counts: count
			});
		} catch (err) {
			logger.info('error occurred in get_faculties');
			logger.error('error in get_faculties', err);
			return response_handler.errorHandler('Internal_Server_Error');
		}
	};
	static get_faculty = async (param) => {
		try {
			const response = await faculty_model.findOne({
				_id: ObjectId(param.id)
			});
			logger.debug('response at get faculty', response);
			return response_handler.success({
				faculty: response,
			});
		} catch (err) {
			console.log(err);
			logger.info('error occurred in get_faculty');
			logger.error('error in get_faculty', err);
			return response_handler.errorHandler('Internal_Server_Error');
		}
	};
}

module.exports = FacultyService;

