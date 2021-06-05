const express = require('express');

// import all the routes here
const CourseRoutes = require('../../Course/course.route');
const SubjectRoutes = require('../../Course/subject.route');
const FacultyRoutes = require('../../Faculty/faculty.route');
const InstituteRoutes = require('../../Institute/institute.route');
const StudentRoutes = require('../../Student/student.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res, next) => {
	// console.log('inside status');
	res.send({
		message: 'OK',
		timestamp: new Date().toISOString(),
		IP: req.ip,
		URL: req.originalUrl,
	});
	next();
});

router.use('/subjects', SubjectRoutes);
router.use('/courses', CourseRoutes);
router.use('/faculties', FacultyRoutes);
router.use('/institutes', InstituteRoutes);
router.use('/students', StudentRoutes);

module.exports = router;
