const dbInfo = require("./lib/dbModifications");
const inquirer = require("inquirer");

const initialPrompt = async () => {
    const answer = await inquirer.prompt([
        {
            type: "list",
            name: "selection",
            message: "Which of the following actions would you like to perform?",
            choices:
                [
                    "View",
                    "Add",
                    "Update",
                    "No actions needed"
                ]
        },
    ]);
    const { selection } = answer;

    if (selection === "View") {
        viewOptions();
    };
    if (selection === "Add") {
        addOptions();
    };
    if (selection === "Update") {
        updateOptions();
    };
    if (selection === "No actions needed") {
        await dbInfo.close()
        return;
    };
};

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
                    "View all employees",
                    "Return to previous menu"
                ]
        }
    ]);
    const { selection } = answer;

    if (selection === "View all departments") {
        console.table(await dbInfo.department.get());
        viewOptions();
    };
    if (selection === "View all roles") {
        console.table(await dbInfo.roles.get());
        viewOptions();
    };
    if (selection === "View all employees") {
        console.table(await dbInfo.employee.get());
        viewOptions();
    };
    if (selection === "Return to previous menu") {
        initialPrompt();
    };
};

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
                    "Add an employee",
                    "Return to previous menu"
                ]
        }
    ]);
    const { selection } = answer;

    if (selection === "Add a department") {
        const answer = await inquirer.prompt([
            {
                type: "input",
                name: "addDept",
                message: "What is the name of the department you would like to add?",
            }
        ]);
        const { addDept } = answer;

        dbInfo.department.add(addDept);
        addOptions();
    };
    if (selection === "Add a role") {
        const answer = await inquirer.prompt([
            {
                type: "input",
                name: "title",
                message: "What is the title of the role you would like to add?",
            },
            {
                type: "input",
                name: "salary",
                message: "What is the salary for this role?",
            },
            {
                type: "input",
                name: "department_id",
                message: "What is the department number for this role?",
            },
        ]);
        const { title, salary, department_id } = answer;

        dbInfo.roles.add(title, salary, department_id);
        addOptions();
    };
    if (selection === "Add an employee") {
        const answer = await inquirer.prompt([
            {
                type: "input",
                name: "first_name",
                message: "What is the first name of the new employee?",
            },
            {
                type: "input",
                name: "last_name",
                message: "What is the last name of the new employee?",
            },
            {
                type: "input",
                name: "role_id",
                message: "What is the employee's role ID?",
            },
            {
                type: "input",
                name: "manager_id",
                message: "What is the ID of the manager the employee reports to?",
            },
        ]);
        const { first_name, last_name, role_id, manager_id } = answer;

        dbInfo.employee.add(first_name, last_name, role_id, manager_id);
        addOptions();
    };
    if (selection === "Return to previous menu") {
        initialPrompt();
    };
};

const updateOptions = async () => {
    console.table(await dbInfo.employee.get());
    const answer = await inquirer.prompt([
        {
            type: "input",
            name: "employee_id",
            message: "Enter the ID number of the employee you wish to update",
        },
        {
            type: "input",
            name: "update_role",
            message: "What is the employee's new role ID?"
        }
    ]);
    const { employee_id, update_role } = answer;

    dbInfo.employee.update(employee_id, update_role);
    initialPrompt();
};

const userModification = {
    viewOptions: viewOptions,
    addOptions: addOptions,
    updateOptions: updateOptions
};
initialPrompt();