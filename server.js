const consoleTable = require("console.table");
const prompts = require("./userPrompts");
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
        prompts.viewOptions();
    }
    if (selection === "Add"){
        prompts.addOptions();
    }
    if (selection === "Update"){
        prompts.updateOptions();
    }
    if (selection === "No actions needed"){
        return;
    }
};
initialPrompt();


// module.exports = ;