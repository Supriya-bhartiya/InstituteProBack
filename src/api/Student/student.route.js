const express = require('express');
const controller = require('./student.controllers');

const router = express.Router();

router.route('/all').get(controller.getStudents);
router.route('/student/:id').get(controller.getStudent);
router.route('/save').post(controller.createStudent);
router.route('/update').put(controller.updateStudent);
router.route('/remove').put(controller.removeStudent);


module.exports = router;
