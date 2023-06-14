// Call the libraries we are going to be using
const inquirer = require('inquirer');
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'Bootcamp',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );  

// Ask user about what action they would like to take
const questions = [{
    type: 'list',
    message: 'What would you like to do?',
    name: 'action',
    choices: ['View All Employees','Add Employee','Update Employee Role','View All Roles','Add Role','View All Departments','Add Department']
}];

//function to initialize app
function init() {
    inquirer.prompt(questions)
    .then((response) => {
        console.log(response);
        //Something like a switch statement here to call the specific action they would like to take
        switch(response) {
            case 'View All Employees':
                getAllEmployees();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Update Employee Role':
                updateEmployeeRole();
                break;
            case 'View All Roles':
                getAllRoles();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'View All Departments':
                getAllDepartments();
                break;
            case 'Add Department':
                addDepartment();
                break;
        }
});
};

function getAllEmployees() {
    // simple query
    db.query(
        'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45',
        function(err, results, fields) {
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
        }
    );
};

function addEmployee() {

};

function updateEmployeeRole() {

};

function getAllRoles() {

};

function addRole() {

};

function getAllDepartments() {

};

function addDepartment() {
    
};

// Function call to initialize app
init();