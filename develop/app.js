const mysql = require('mysql2');
const inquirer = require('inquirer');
const { getAllDepartments, getAllRoles, getAllEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole } = require('./database');

const connection = mysql.createConnection({
  host: 'your_database_host',
  user: 'your_username',
  password: 'your_password',
  database: '/db/employeeTrackerDB.sql'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
    return;
  }
  console.log('Connected to the database');
  startApp();
});

function startApp() {
  inquirer
    .prompt([
      {
        name: 'choice',
        type: 'list',
        message: 'Select an option:',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Exit'
        ]
      }
    ])
    .then((answers) => {
      switch (answers.choice) {
        case 'View all departments':
          getAllDepartments(connection, () => {
            startApp();
          });
          break;
        case 'View all roles':
          getAllRoles(connection, () => {
            startApp();
          });
          break;
        case 'View all employees':
          getAllEmployees(connection, () => {
            startApp();
          });
          break;
        case 'Add a department':
          inquirer
            .prompt([
              {
                name: 'name',
                type: 'input',
                message: 'Enter the name of the department:'
              }
            ])
            .then((answers) => {
              addDepartment(connection, answers.name, () => {
                console.log('Department added successfully');
                startApp();
              });
            });
          break;
        case 'Add a role':
          // Prompt for role details and call the addRole function
          break;
        case 'Add an employee':
          // Prompt for employee details and call the addEmployee function
          break;
        case 'Update an employee role':
          // Prompt for employee and new role details and call the updateEmployeeRole function
          break;
        case 'Exit':
          console.log('Exiting the application');
          connection.end();
          break;
      }
    });
}
