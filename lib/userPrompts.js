const dbInfo = require("./dbModifications");
const inquirer = require("inquirer");

const viewOptions = async () => {
    const answer = await inquirer.prompt([
        {
            type: "list",
            name: "selection",
            message: "Please select the action you wish to perform",
            choices: 
            [
                "View all departments",
                "View all roles",
                "View all employees"
            ]
        }
    ]);
    const { selection } = answer;

    if (selection === "View all departments"){
        console.table(dbInfo.department.get());
    }
    if (selection === "View all roles"){
        console.table(dbInfo.roles.get());
    }
    if (selection === "View all employees"){
        console.table(dbInfo.employee.get());
    }
}

const addOptions = async () => {
    const answer = await inquirer.prompt([
        {
            type: "list",
            name: "selection",
            message: "Please select the action you wish to perform",
            choices: 
            [
                "Add a department",
                "Add a role",
                "Add an employee"
            ]
        }
    ]);
    const { selection } = answer;

    if (selection === "Add a department"){
        console.table(dbInfo.department.add());
    }
    if (selection === "Add a role"){
        console.table(dbInfo.roles.add());
    }
    if (selection === "Add an employee"){
        console.table(dbInfo.employee.add());
    } 
};

const updateOptions = () => {
    console.table(dbInfo.employee.update());
}

const userModification = {
    viewOptions: viewOptions,
    addOptions: addOptions,
    updateOptions: updateOptions
};

module.exports = userModification;