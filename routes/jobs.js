const express = require('express');
const router = express.Router();
const {authRole} = require('../middleware/authentication')
const {
    getAllJobs,
    createJob,
    getJob,
    updateJob,
    deleteJob,
    getRecommendedJobs,
} = require('../controllers/jobs')

router.route('/').post(authRole,createJob).get(getAllJobs)
router.route('/:id').get(getJob).delete(authRole,deleteJob).patch(authRole,updateJob)
router.get('/recommendedJobs/:id',getRecommendedJobs)
module.exports = router