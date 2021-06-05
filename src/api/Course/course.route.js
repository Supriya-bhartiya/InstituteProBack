const express = require('../../../node_modules/express');
const validate = require('../../../node_modules/express-validation');
const controller = require('./course.controllers');
const validation = require('../../validations/course.validation');

const router = express.Router();

router.route('/save').post(controller.createCourse);
router.route('/update').put(controller.updateCourse);
router.route('/all').get(controller.getCourses);
router.route('/course/:id').get(validate(validation.get_course),controller.getCourse);
router.route('/remove').put(controller.removeCourse);

module.exports = router;
