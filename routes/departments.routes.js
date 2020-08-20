const express = require('express');
const router = express.Router();
const DepartmentController = require('../controllers/departments.controller');

router.get('/departments', DepartmentController.getAllDepartments);
router.get('/departments/random', DepartmentController.getRandomDepartment);
router.get('/departments/:id', DepartmentController.getDepartmentByID);
router.post('/departments', DepartmentController.postNewDepartment);
router.put('/departments/:id',DepartmentController.updateDepartment);
router.delete('/departments/:id',DepartmentController.deleteDepartment);

module.exports = router;
