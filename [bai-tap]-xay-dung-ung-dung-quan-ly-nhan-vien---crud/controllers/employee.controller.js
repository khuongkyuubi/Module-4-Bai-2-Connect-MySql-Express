const data = require("../models/employee.model")
const _ = require("lodash")

class EmployeeController {
    constructor() {
    }

    async renderListEmployees(req, res, next) {
        // console.log(await data.getEmployees())
        let employeesList = (await data.getEmployees())
        res.render("employee/list", {employeesList, tittle: "List employees"})
        next();
    }

    async renderCreateEmployee(req, res, next) {
        res.render("employee/create", {tittle: "Create employee"})
        next();
    }

    async createEmployee(req, res, next) {
        let employee = req.body;
        await data.createEmployee(employee)
        res.redirect("list")
        next();

    }

    async renderDeleteEmployee(req, res, next) {
        let index = req.query.index;
        let id = req.query.id;
        let employee = (await data.getEmployeeById(id))[0];
        res.render("employee/delete", {index, employee, tittle: "Delete employee"})
        next();
    }


    async deleteEmployee(req, res, next) {
        let id = req.params.id
        await data.deleteEmployee(id)
        res.redirect("../list")

        next();

    }


}

module.exports = new EmployeeController()