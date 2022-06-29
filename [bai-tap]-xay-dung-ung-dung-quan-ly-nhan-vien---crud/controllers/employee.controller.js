const data = require("../models/employee.model")
const _ = require("lodash");
const fs = require("fs");
const path = require("path");


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
        const employee = req.body;
        const file = req.file
        if (!file) {
            const error = new Error('Error occur')
            error.httpStatusCode = 400
            return next(error)
        }
        console.log(file)
        // res.json("hello")
        employee.imgPath = "/" + file.path
        await data.createEmployee(employee)
        res.redirect("list")
        next();


    }

    async renderDeleteEmployee(req, res, next) {
        let index = parseInt(req.query.index);
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

    async paginationListEmployee(req, res, next) {

        let page = req.params.page || 0;
        let perPage = 1;
        let pageOffset = perPage * (page - 1);
        let employeesList = await data.getEmployeeByPage(perPage, pageOffset);
        // res.json(employeesList)
        let totalEmployees = (await data.getTotalEmployees())[0]["total"];
        let maxPage = Math.ceil(totalEmployees / perPage)

        res.render("employee/pagination", {employeesList, page, maxPage, tittle: "List employee"})


    }


}

module.exports = new EmployeeController()