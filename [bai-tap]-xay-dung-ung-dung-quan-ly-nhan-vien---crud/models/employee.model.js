const employeeDB = require("../config/db");
const mysql = require("mysql")

class EmployeeModel {
    constructor() {
    }

    async getEmployees() {
        try {
            const sql = `SELECT * FROM ??`;
            let getSql = mysql.format(sql, ["employees"])
            let data = await employeeDB.query(getSql)
            // console.log(data)
            return JSON.parse(JSON.stringify(data))
        } catch (err) {
            console.log(err.message)
        }

    }


    async createEmployee(employee) {
        try {
            const sql = `INSERT INTO ??(??, ??) VALUES (?,?);`;
            const createEmployeeSql = mysql.format(sql, ["employees", "name", "department", employee["name"], employee["department"]]);
            await employeeDB.query(createEmployeeSql);
        } catch (err) {
            console.log(err.message)
        }


    }

    async getEmployeeById(id) {
        try {
            const sql = `SELECT * FROM ?? WHERE ?? = ?`;
            let getSql = mysql.format(sql, ["employees", "id", id])
            let data = await employeeDB.query(getSql)
            return JSON.parse(JSON.stringify(data))
        } catch (err) {
            console.log(err.message)
        }

    }

    async deleteEmployee(id) {
        try {
            const sql = `DELETE FROM ?? WHERE ?? = ?;`;
            const deleteEmployeeSql = mysql.format(sql, ["employees", "id", id]);
            await employeeDB.query(deleteEmployeeSql)
        } catch (err) {
            console.log(err.message)
        }

    }

    async getEmployeeByPage(perPage, page) {
        try {

            const sql = `SELECT * FROM ??
                         LIMIT ?, ?;   
                        `
            const getEmployeeSql = mysql.format(sql, ["employees", page, perPage]);
            const data = await employeeDB.query(getEmployeeSql);
            return JSON.parse(JSON.stringify(data));

        } catch (err) {
            console.log(err.message);
        }
    }

    async getTotalEmployees() {
        const sql = `SELECT COUNT(*) AS ?? FROM ??;`;
        const countEmployeeSql = mysql.format(sql, ["total","employees"]);

        return await employeeDB.query(countEmployeeSql)


    }



}

module.exports = new EmployeeModel()