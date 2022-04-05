const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "MySQLPassword1!",
    database: "employee_db",
})

const getDepartment = connection.query("SELECT * FROM department", (error, result) => {
    console.table(result)
});

const getRoles = connection.query("SELECT * FROM role", (error, result) => {
    console.table(result)
});

const getEmployee = connection.query("SELECT * FROM employee", (error, result) => {
    console.table(result)
});

const addDepartment = async() => {
    
}

const addRole = async() => {

}

const addEmployee = async() => {

}

const updateEmployee = async() => {

}

const dbInfo = {
    department: {
        get: getDepartment,
        add: addDepartment,
    },
    roles: {
        get: getRoles,
        add: addRole,
    },
    employee: {
        get: getEmployee,
        add: addEmployee,
        update: updateEmployee,
    }
};

module.exports = dbInfo;