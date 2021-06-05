const express = require('express');
const controller = require('./institute.controllers');

const router = express.Router();

router.route('/all').get(controller.getInstitutes);
router.route('/institute/:id').get(controller.getInstitute);
router.route('/save').post(controller.createInstitute);
router.route('/update').put(controller.updateIntitute);
router.route('/remove').put(controller.removeInstitute);

module.exports = router;
