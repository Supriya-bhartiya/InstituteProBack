const Joi = require('joi');

module.exports = {
	//GET /v1/courses/course/:id
	get_course: {
		param: {
			id:Joi.string().required()
		},
		query: {},
		body: {},
	},


};
