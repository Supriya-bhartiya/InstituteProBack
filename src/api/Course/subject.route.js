const express = require('express');
const controller = require('./course.controllers');

const router = express.Router();

router.route('/all').get(controller.getSubjects);
router.route('/subject/:id').get(controller.getSubject);

module.exports = router;
