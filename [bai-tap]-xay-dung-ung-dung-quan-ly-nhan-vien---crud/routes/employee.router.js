const express = require('express')
const router = express.Router();
const employeeController = require("../controllers/employee.controller")

module.exports = router;
// [GET] /employee/list
router.get("/list",employeeController.renderListEmployees);

// [GET] /employee/create
router.get("/create", employeeController.renderCreateEmployee );

// [POST] /employee/create
router.post("/create", employeeController.createEmployee );

//[GET] /employee/delete
router.get("/delete", employeeController.renderDeleteEmployee);

//[DELETE] /employee/delete:id
router.delete("/delete/:id", employeeController.deleteEmployee);
