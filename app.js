const inquirer = require("inquirer");

// import db enquires and MiddleWares
const { printToScreen, options,promptUser, handleOptionResponse } = require("./lib");

const mysql = require("mysql2");
// Creat the database connection
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root", // add your user here: default: root
    password: "", // add your password here
    database: "employees_db",
  },
  printToScreen("✔ Database is connected...⚙")
);

// call inquirer for a new prompt
const chooseOption = () => {
  promptUser(options)
    .then((userOption) => {
      handleOptionResponse(db, userOption.toDo, chooseOption);
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        console.error(error);
      }
    });
};
// start the application
chooseOption();
