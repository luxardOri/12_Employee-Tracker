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
    .then(({action}) => {
        console.log(action);
        //Something like a switch statement here to call the specific action they would like to take
        switch(action) {
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
        'select e.id as employee_id,concat(e.first_name," ",e.last_name) as employee_name,r.title, d.name as department_name, CONCAT("$", FORMAT(r.salary, 0)) as salary,case when manager_id is null then "Is a Manager" else (select concat(first_name, " ",last_name) as manager_name from employees e2 where e2.id = e.manager_id) END AS manager_name from employees e join roles r on e.role_id = r.id join departments d on r.department_id = d.id;',
        function(err, results, fields) {
        console.table(results); // results contains rows returned by server
        //console.log(fields); // fields contains extra meta data about results, if available
        return setTimeout(init, 3000)
    });
};

async function addEmployee() {
    //Have a validation for inputs, so if a specific phrase is typed then it will go back to the main menu.
    //Can put in a confirm option before running insert statement
    // db.query("Select * from roles where department_id = ?",[answers.id], function(err, res, fields){

    // })

    console.log(await getDepartmentChoices(2));
    return setTimeout(init, 3000)

};

async function getDepartmentChoices(department_id) {
    const [data] = await db.promise().query("Select * from roles where department_id = ?",[department_id])
    console.log("data",data);
    return data.map(role => ({name: role.title, value: role.id}))
};

function updateEmployeeRole() {

};

function getAllRoles() {
    // simple query
    db.query(
        'select r.id as role_id, title, d.name as department_name from roles r join departments d on r.department_id = d.id;',
        function(err, results, fields) {
        console.table(results); // results contains rows returned by server
        //console.log(fields); // fields contains extra meta data about results, if available
        return setTimeout(init, 3000)
    });
};

function addRole() {

};

function getAllDepartments() {
    // simple query
    db.query(
        'select id as role_id, name as department_name from departments;',
        function(err, results, fields) {
        console.table(results); // results contains rows returned by server
        //console.log(fields); // fields contains extra meta data about results, if available
        return setTimeout(init, 3000)
    });
};

function addDepartment() {
    
};

// Function call to initialize app
init();