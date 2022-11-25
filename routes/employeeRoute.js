const express = require('express');
const router = express.Router();

const {
  addEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
  getSingleEmployee,
  deleteEmp,
} = require('../controllers/employeeController');

// this is user part
router.route('/employees').get(getEmployees);
router.route('/employee/:id').get(getSingleEmployee);
router.route('/create').post(addEmployee);
router.route('/update/:id').put(updateEmployee);
router.route('/delemployee/:id').delete(deleteEmployee);
router.route('/delemp').post(deleteEmp);

module.exports = router;
