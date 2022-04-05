const inquirer = require("inquirer");
const consoleTable = require("console.table");
const prompts = require("./lib/userPrompts");
const database = require("./lib/dbModifications");

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

    if (selection === "View"){
        userPrompts.viewOptions();
    }
    if (selection === "Add"){
        userPrompts.addOptions();
    }
    if (selection === "Update"){
        userPrompts.updateOptions();
    }
    if (selection === "No actions needed"){
        exit;
    }
};