const express = require('express')
const router = express.Router();
const multer = require("multer");
// const upload = multer({ dest: 'public/uploads/' })
const employeeController = require("../controllers/employee.controller");

// SET STORAGE
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null,  file.originalname)
    }
})

const upload = multer({ storage: storage })

module.exports = router;
// [GET] /employee/list
router.get("/list", employeeController.renderListEmployees);

// [GET] /employee/create
router.get("/create", employeeController.renderCreateEmployee);

// [POST] /employee/create
router.post("/create", upload.single('avatar'), employeeController.createEmployee);

//[GET] /employee/delete
router.get("/delete", employeeController.renderDeleteEmployee);

//[DELETE] /employee/delete/:id
router.delete("/delete/:id", employeeController.deleteEmployee);

//[GET] /employee/pagination/
router.get("/pagination", (req, res, next) => {
    res.redirect("/employee/pagination/1"); // redriect luopon phải trỏ từ root
    next()
});
//[GET] /employee/pagination/:id
router.get("/pagination/:page", employeeController.paginationListEmployee)
