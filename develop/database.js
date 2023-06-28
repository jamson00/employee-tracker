// database.js

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'your_database_host',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database_name'
});

// Function to get all departments
function getAllDepartments(callback) {
  connection.query('SELECT * FROM department', (err, results) => {
    if (err) {
      console.error('Error retrieving departments:', err);
      callback(err, null);
      return;
    }
    console.table(results);
    callback(null, results);
  });
}

// Function to get all roles
function getAllRoles(callback) {
  connection.query('SELECT * FROM role', (err, results) => {
    if (err) {
      console.error('Error retrieving roles:', err);
      callback(err, null);
      return;
    }
    console.table(results);
    callback(null, results);
  });
}

// Function to get all employees
function getAllEmployees(callback) {
  connection.query('SELECT * FROM employee', (err, results) => {
    if (err) {
      console.error('Error retrieving employees:', err);
      callback(err, null);
      return;
    }
    console.table(results);
    callback(null, results);
  });
}

// Function to add a department
function addDepartment(name, callback) {
  connection.query('INSERT INTO department (name) VALUES (?)', [name], (err, results) => {
    if (err) {
      console.error('Error adding department:', err);
      callback(err, null);
      return;
    }
    callback(null, results);
  });
}

// Function to add a role
function addRole(title, salary, departmentId, callback) {
  connection.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentId], (err, results) => {
    if (err) {
      console.error('Error adding role:', err);
      callback(err, null);
      return;
    }
    callback(null, results);
  });
}

// Function to add an employee
function addEmployee(firstName, lastName, roleId, managerId, callback) {
  connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerId], (err, results) => {
    if (err) {
      console.error('Error adding employee:', err);
      callback(err, null);
      return;
    }
    callback(null, results);
  });
}

// Function to update an employee's role
function updateEmployeeRole(employeeId, roleId, callback) {
  connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [roleId, employeeId], (err, results) => {
    if (err) {
      console.error('Error updating employee role:', err);
      callback(err, null);
      return;
    }
    callback(null, results);
  });
}

module.exports = {
  getAllDepartments,
  getAllRoles,
  getAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole
};
