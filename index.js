const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);
// array of questions for user
function promptUser() {
    return inquirer.prompt([
        {
            name: "projectTitle",
            type: "input",
            message: "What is the name of your project?"
        },
        {
            name: "projectDescription",
            type: "input",
            message: "Please provide a description of your project?"
        },
        {
            name: "projectInstallation",
            type: "input",
            message: "Please list any nescessary packages to install"
        },
        {
            name: "projectUsage",
            type: "input",
            message: "What is the intended use of your project? Provide examples."
        },
        {
            name: "projectLicenses",
            type: "list",
            message: "Please provide a license that was used.",
            choices: [
                "MIT [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)",
                "IBM Public License [![License: IPL 1.0](https://img.shields.io/badge/License-IPL%201.0-blue.svg)](https://opensource.org/licenses/IPL-1.0)",
                "Apache [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)",
                "BSD 3 [![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)",
                "None"
            ]
        },
        {
            name: "projectContributors",
            type: "input",
            message: "Please list any contributers on this project"
        },
        {
            name: "projectTests",
            type: "input",
            message: "Please list any tests."
        },
        {
            name: "projectQuestions",
            type: "input",
            message: "What is your GitHub profile name?"
        },
        {
            name: "projectQuestions2",
            type: "input",
            message: "What is your email?"
        },
    ]);
}

function generateMarkdown(answers) {
    return `
# ${answers.projectTitle}

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Licenses](#licenses)
- [Badges](#badges)
- [Contributors](#contributors)
- [Tests](#tests)
- [Questions](#questions)

## Description:
${answers.projectDescription}
## Installation:
${answers.projectInstallation}
## Usage:
${answers.projectUsage}
## Licenses:
${answers.projectLicenses}
## Contributors:
${answers.projectContributors}
## Tests:
${answers.projectTests}
## Questions:
Please see my GitHub account: ${answers.projectQuestions}
Or email me directly: ${answers.projectQuestions2}
  `;
  }
  

async function init() {
    console.log('Welcome to the ReadMe Generator! Please use an empty value to skip any question')
    try {
        const answers = await promptUser();

        const readMe = generateMarkdown(answers);

        await writeFileAsync("README.md", readMe);

        console.log("Successfully wrote to ReadMe.md");

    } catch(err) {
        console.log(err);
    }

}

// function call to initialize program
init();
