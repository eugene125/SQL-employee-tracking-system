const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "MySQLPassword1!",
    database: "employee_db",
});

async function closeConnection(){
    promiseDB.end();
};

const promiseDB = db.promise();

const getDepartment = async() => {
    const [result] = await promiseDB.query("SELECT id, name FROM department");
    return result;
};

const getRoles = async() => {
    const [result] = await promiseDB.query("SELECT id, title, salary, department_id FROM role",);
    return result;
};

const getEmployee = async() => {
    const [result] = await promiseDB.query("SELECT id, first_name, last_name, role_id, manager_id FROM employee",);
    return result;
};

const addDepartment = async(addDept) => {
    promiseDB.query("INSERT INTO department set ?", {
        name: addDept
    });
};

const addRole = async(title, salary, department_id) => {
    promiseDB.query("INSERT INTO role set ?", {
        title: title, 
        salary: salary,
        department_id: department_id
    });
};

const addEmployee = async(first_name, last_name, role_id, manager_id) => {
    promiseDB.query("INSERT INTO employee set ?", {
        first_name: first_name,
        last_name: last_name,
        role_id: role_id,
        manager_id: manager_id
    });
};

const updateEmployee = async(employee_id, update_role) => {
    const [result] = await promiseDB.query(`UPDATE employee SET role_id = ${update_role} WHERE id = ${employee_id}`);
    return result;
};

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
    },
    close: closeConnection
};
module.exports = dbInfo;