const express = require('../../../node_modules/express');
const controller = require('./faculty.controllers');

const router = express.Router();

router.route('/all').get(controller.getFaculties);
router.route('/faculty/:id').get(controller.getFaculty);
router.route('/save').post(controller.createFaculty);
router.route('/update').put(controller.updateFaculty);
router.route('/remove').put(controller.removeFaculty);

module.exports = router;
