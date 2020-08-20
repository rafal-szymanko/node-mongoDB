const express = require('express');
const router = express.Router();
const Employee = require('../models/employees.model');
const EmployeeController = require('../controllers/employees.controller');


router.get('/employees', EmployeeController.getAllEmployees);
router.get('/employees/random', EmployeeController.getRandomEmployee);
router.get('/employees/:id', EmployeeController.getEmployeeByID);
router.post('/employees', EmployeeController.postNewEmployee);
router.put('/employees/:id', EmployeeController.updateEmployee);
router.delete('/employees/:id', EmployeeController.deleteEmployee);

module.exports = router;
