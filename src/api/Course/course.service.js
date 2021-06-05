const subject_model = require('./course.model').Subject;
const course_model = require('./course.model').Course;
const response_handler = require('../../middlewares/response_handler');
const logger = require('../../utils/logger')(__filename);
const ObjectId = require('../../../node_modules/mongodb').ObjectID;

class CourseService {

	static save_subject = async (data) => {
		try {
			const response = await subject_model.create(data);
			logger.debug('created subject', response);
			return response_handler.success(response);
		} catch (err) {
			logger.info('error occurred in save_subject');
			logger.error('error in save_subject', err);
			return response_handler.errorHandler('Internal_Server_Error');
		}
	};
	static update_subject = async (data) => {
		try {
			const response = await subject_model.findOneAndUpdate({
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
			logger.info('error occurred in update_subject');
			logger.error('error in update_subject', error);
			return response_handler.errorHandler('Internal_Server_Error');
		}
	};
	static get_subjects = async (param, data) => {
		try {
			let response;
			let count;
			if (param && param.offset && param.limit) {
				response = await subject_model
					.find(data)
					.sort({
						_id: 'asc',
					})
					.skip(param.offset)
					.limit(param.limit);
				count = await subject_model.countDocuments(data);
			} else {
				response = await subject_model
					.find(data)
					.sort({
						_id: 'asc',
					});
				count = response.length;
			}
			logger.debug('response in get_subjects', response);
			return response_handler.success({
				subjects: response,
				total_counts: count
			});
		} catch (err) {
			logger.info('error occurred in get_subjects');
			logger.error('error in get_subjects', err);
			return response_handler.errorHandler('Internal_Server_Error');
		}
	};
	static get_subject = async (param) => {
		try {
			const response = await subject_model.findOne({
				_id: ObjectId(param.id)
			});
			logger.debug('response in get_subject', response);
			return response_handler.success(response);
		} catch (err) {
			logger.info('error occurred in get_subject');
			logger.error('error in get_subject', err);
			return response_handler.errorHandler('Internal_Server_Error');
		}
	};
	static save_course = async (data) => {
		try {
			const response = await course_model.create(data);
			logger.debug('created course', response);
			return response_handler.success(response);
		} catch (err) {
			logger.info('error occurred in save_course');
			logger.error('error in save_course', err);
			return response_handler.errorHandler('Internal_Server_Error');
		}
	};
	static update_course = async (data) => {
		try {
			const response = await course_model.findOneAndUpdate({
				_id: ObjectId(data._id),
			},
				data
			);
			logger.debug('response of update', response);
			return response_handler.success({
				id: response._id,
			});
		} catch (error) {
			logger.info('error occurred in update_course');
			logger.error('error in update_course', error);
			return response_handler.errorHandler('Internal_Server_Error');
		}
	};
	static get_courses = async (param, data) => {
		try {
			let response;
			let count;
			if (param && param.offset && param.limit) {
				response = await course_model
					.find(data)
					.sort({
						_id: 'asc',
					})
					.skip(param.offset)
					.limit(param.limit);
				count = await course_model.countDocuments(data);
			} else {
				response = await course_model
					.find(data)
					.sort({
						_id: 'asc',
					});
				count = response.length;
			}
			logger.debug('response in get course', response);
			return response_handler.success({
				courses: response,
				total_counts: count
			});
		} catch (err) {
			logger.info('error occurred in get_courses');
			logger.error('error in get_courses', err);
			return response_handler.errorHandler('Internal_Server_Error');
		}
	};
	static get_course = async (param) => {
		try {
			const response = await course_model.findOne({
				_id: ObjectId(param.id)
			});
			logger.debug('response at get course', response);
			return response_handler.success({
				course: response,
			});
		} catch (err) {
			console.log(err);
			logger.info('error occurred in get_course');
			logger.error('error in get_course', err);
			return response_handler.errorHandler('Internal_Server_Error');
		}
	};
}

const checkReservations = async (data, totalParkingSlots) => {
	try {
		const query = {
			isActive: true,
			isBooked: true
		}
		let availableParkings = await getParkingsForReservation(data);
		if (availableParkings && availableParkings.length > 0) {
			availableParkings = availableParkings[0]; //limit of 1 sent 
			const obj = Object.assign({}, data);
			obj.parkingId = availableParkings._id;
			obj.bookingTime = new Date();
			let currentTime = new Date();
			const occupied = await ParkingService.get_parkings({}, query);
			if (occupied && occupied.status === 200 && occupied.data.total_counts > 0 && (occupied.data.total_counts < (totalParkingSlots * 50 / 100))) {
				obj.waitingTime = new Date(currentTime.setMinutes(currentTime.getMinutes() + 30)); //default 30 min including 15 min prio booking allowed
			} else {
				obj.waitingTime = new Date(currentTime.setMinutes(currentTime.getMinutes() + 15)); //eliminating 15 min on 50% reservation
			}
			return obj;
		} else {
			return { message: "Reservation Already Exists" };
		}
	} catch (error) {
		logger.info('error occurred at checkReservations', error);
		return error;
	}

}
const getParkingsForReservation = async (data) => {
	try {
		const reservationAlreadyExists = await reservation_model.findOne({ vehicleNo: data.vehicleNo, isActive: true });
		if (!reservationAlreadyExists) {
			const filterParams = {
				isActive: true,
				isBooked: false
			}
			// isRequirdReservation is true either pregnent or disbled or any addition to rule like old age.
			if (data.isRequirdReservation) {
				filterParams.slotType = 'Reserved';
				filterParams.isCloseToLift = true;
			} else {
				filterParams.slotType = 'General';
			}
			const response = await parking_model.find({ $query: filterParams, $orderby: { floor: 1 } }).limit(1); //find for reserved or genral parking lot 
			//if search was for reserved and reserved is full find for one general parking lot.
			if (response && response.length === 0 && filterParams.slotType !== 'General') {
				filterParams.slotType = 'General';
				const res = await parking_model.find({ $query: filterParams, $orderby: { floor: 1 } }).limit(1);
				return res;
			}
			return response;
		}
		return [];
	} catch (error) {
		logger.info('error occurred at checkReservations', error);
		return error;
	}

}

module.exports = CourseService;