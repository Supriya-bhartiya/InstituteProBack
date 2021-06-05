const student_model = require('./student.model').Student;
const response_handler = require('../../middlewares/response_handler');
const logger = require('../../utils/logger')(__filename);
const ObjectId = require('mongodb').ObjectID;

class StudentService {

	static save_student = async (data) => {
		try {
			const response = await student_model.create(data);
			logger.debug('created student', response);
			return response_handler.success(response);
		} catch (err) {
			logger.info('error occurred in save_student');
			logger.error('error in save_student', err);
			return response_handler.errorHandler('Internal_Server_Error');
		}
	};
	static update_student = async (data) => {
		try {
			const response = await student_model.findOneAndUpdate({
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
			logger.info('error occurred in update_student');
			logger.error('error in update_student', error);
			return response_handler.errorHandler('Internal_Server_Error');
		}
	};
	static get_students = async (param, data) => {
		try {
			let response;
			let count;
			if (param && param.offset && param.limit) {
				response = await student_model
					.find(data)
					.sort({
						_id: 'asc',
					})
					.skip(param.offset)
					.limit(param.limit);
				count = await student_model.countDocuments(data);
			} else {
				response = await student_model
					.find(data)
					.sort({
						_id: 'asc',
					});
				count = response.length;
			}
			logger.debug('response in get students', response);
			return response_handler.success({
				students: response,
				total_counts: count
			});
		} catch (err) {
			logger.info('error occurred in get_students');
			logger.error('error in get_students', err);
			return response_handler.errorHandler('Internal_Server_Error');
		}
	};
	static get_student = async (param) => {
		try {
			const response = await student_model.findOne({
				_id: ObjectId(param.id)
			});
			logger.debug('response at get_student', response);
			return response_handler.success({
				student: response,
			});
		} catch (err) {
			console.log(err);
			logger.info('error occurred in get_student');
			logger.error('error in get_student', err);
			return response_handler.errorHandler('Internal_Server_Error');
		}
	};
}

module.exports = StudentService;