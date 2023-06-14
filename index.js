// Call the libraries we are going to be using
const inquirer = require('inquirer');

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
        getAllEmployees();
        addEmployee();
        updateEmployeeRole();
        getAllRoles();
        addRole();
        getAllDepartments();
        addDepartment();
});
};

function getAllEmployees() {

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