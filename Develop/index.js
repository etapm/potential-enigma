// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");

// TODO: Create an array of questions for user input
const promptUser = async () => {
  const data = await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Enter the title of your project:",
    },
    {
      type: "input",
      name: "description",
      message: "Enter a description of your project:",
    },
    {
      type: "input",
      name: "installation",
      message: "Enter installation instructions for your project:",
    },
    {
      type: "input",
      name: "usage",
      message: "Enter usage information for your project:",
    },
    {
      type: "input",
      name: "contributing",
      message: "Enter contribution guidelines for your project:",
    },
    {
      type: "input",
      name: "tests",
      message: "Enter test instructions for your project:",
    },
    {
      type: "list",
      name: "license",
      message: "Choose a license for your project:",
      choices: [
        "MIT License",
        "Apache License 2.0",
        "GNU General Public License v3.0",
      ],
    },
    {
      type: "input",
      name: "github",
      message: "Enter your GitHub username:",
    },
    {
      type: "input",
      name: "email",
      message: "Enter your email address:",
    },
  ]);
  return data;
};

// TODO: Create a function to initialize app
const generateREADME = (data) => {
  let licenseBadge = "";
  let licenseNotice = "";

  switch (data.license) {
    case "MIT License":
      licenseBadge =
        "![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)";
      licenseNotice = "This application is covered under the MIT License.";
      break;
    case "Apache License 2.0":
      licenseBadge =
        "![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)";
      licenseNotice =
        "This application is covered under the Apache License 2.0.";
      break;
    case "GNU General Public License v3.0":
      licenseBadge =
        "![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)";
      licenseNotice =
        "This application is covered under the GNU General Public License v3.0.";
      break;
    default:
      break;
  }
  return `
  # ${data.title}
  
  ${licenseBadge}
  
  ## Description
  
  ${data.description}
  
  ## Table of Contents
  
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Contributing](#contributing)
  - [Tests](#tests)
  - [Questions](#questions)
  
  ## Installation
  
  ${data.installation}
  
  ## Usage
  
  ${data.usage}
  
  ## License
  
  This project is licensed under the ${data.license} license.
  
  
  ## Contributing
  
  ${data.contributing}
  
  ## Tests
  
  ${data.tests}
  
  ## Questions
  
  For additional questions or concerns, please contact me at:
  
  - Email: ${data.email}
  - GitHub: https://github.com/${data.github}
  `;
};

// TODO: Create a function to write README file

const writeREADME = (contents) => {
  fs.writeFile("README.md", contents, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("README.md file generated!");
    }
  });
};

// TODO: Create a function to initialize app
(async () => {
  try {
    const userData = await promptUser();
    const readmeContents = generateREADME(userData);
    writeREADME(readmeContents);
  } catch (error) {
    console.error(error);
  }
})();
