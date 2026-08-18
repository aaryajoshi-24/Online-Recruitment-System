const express = require('express');
const router = express.Router();
const applicantController = require('../controllers/applicantController');

router.get('/:id', applicantController.getApplicantProfile);
router.put('/:id', applicantController.updateApplicantProfile);

module.exports = router;