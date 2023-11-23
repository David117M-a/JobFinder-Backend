const { Router } = require('express');
const { getJobs, getJobById, create, apply, getAppliedJobs } = require('../controllers/jobsController');
const router = Router();

router.post('/', create);
router.get('/', getJobs);
router.get('/:jobId/:userId', getJobById);
router.post('/apply/:jobId/:userId', apply);

module.exports = router;