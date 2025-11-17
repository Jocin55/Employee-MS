const express = require('express');
const router = express.Router();
const salaryCtrl = require('../controllers/salaryController');


router.post('/', salaryCtrl.createSalary);
router.get('/', salaryCtrl.getSalaries);
router.get('/:id', salaryCtrl.getSalaryById);
router.put('/:id', salaryCtrl.updateSalary);
router.delete('/:id', salaryCtrl.deleteSalary);

module.exports = router;
