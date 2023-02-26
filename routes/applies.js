const express = require('express')
const router = express.Router();
const {authRole} = require('../middleware/authentication')

const { createApply, getAllApplies, getSpecificApply, deleteApply } = require('../controllers/apply')

router.route('/').get(getAllApplies)
router.route('/:id').get(authRole,getSpecificApply).delete(deleteApply).post(createApply)

module.exports = router;