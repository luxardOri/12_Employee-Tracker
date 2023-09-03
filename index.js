// Call the libraries we are going to be using
const inquirer = require("inquirer");
const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "Bootcamp",
    database: "employee_db",
  },
  console.log(`Connected to the employee_db database.`)
);

// Ask user about what action they would like to take
const questions = [
  {
    type: "list",
    message: "What would you like to do?",
    name: "action",
    choices: [
      "View All Employees",
      "Add Employee",
      "Update Employee Role",
      "View All Roles",
      "Add Role",
      "View All Departments",
      "Add Department",
    ],
  },
];

//function to initialize app
function init() {
  inquirer.prompt(questions).then(({ action }) => {
    console.log(action);
    //Something like a switch statement here to call the specific action they would like to take
    switch (action) {
      case "View All Employees":
        getAllEmployees();
        break;
      case "Add Employee":
        addEmployee();
        break;
      case "Update Employee Role":
        updateEmployeeRole();
        break;
      case "View All Roles":
        getAllRoles();
        break;
      case "Add Role":
        addRole();
        break;
      case "View All Departments":
        getAllDepartments();
        break;
      case "Add Department":
        addDepartment();
        break;
    }
  });
}

function getAllEmployees() {
  // simple query
  db.query(
    'select e.id as employee_id,concat(e.first_name," ",e.last_name) as employee_name,r.title, d.name as department_name, CONCAT("$", FORMAT(r.salary, 0)) as salary,case when manager_id is null then "Is a Manager" else (select concat(first_name, " ",last_name) as manager_name from employees e2 where e2.id = e.manager_id) END AS manager_name from employees e join roles r on e.role_id = r.id join departments d on r.department_id = d.id;',
    function (err, results, fields) {
      console.table(results); // results contains rows returned by server
      //console.log(fields); // fields contains extra meta data about results, if available
      return setTimeout(init, 1000);
    }
  );
}

async function queryRoles() {
  return new Promise((resolve, reject) => {
    db.query("select * from roles", function (err, results) {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

async function queryManagers() {
  return new Promise((resolve, reject) => {
    db.query("select * from employees where manager_id is null", function (
      err,
      results
    ) {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

async function addEmployee() {
  const roles = await queryRoles();
  const managers = await queryManagers();
  const newHire = [
    {
      type: "input",
      message: "What is the first name of the new hire?",
      name: "emp_firstName",
    },
    {
      type: "input",
      message: "What is the last name of the new hire?",
      name: "emp_lastName",
    },
    {
      type: "list",
      message: "What role are they being hired for?",
      name: "emp_role",
      // using map to gather department ids as well as department names, but if i have both in use it will only display id and not the name
      choices: roles.map((item) => ({
        name: item.title,
        value: item.id,
      })),
    },
    {
      type: "list",
      message: "What manager will they be assigned to?",
      name: "emp_manager",
      // using map to gather department ids as well as department names, but if i have both in use it will only display id and not the name
      choices: managers.map((item) => ({
        name: item.first_name,
        value: item.id,
      })),
    },
  ];
  //Can put in a confirm option before running insert statement
  inquirer
    .prompt(newHire)
    .then(({ emp_firstName, emp_lastName, emp_role, emp_manager }) => {
      db.query(
        "INSERT INTO employees SET ?",
        {
          first_name: emp_firstName,
          last_name: emp_lastName,
          role_id: emp_role,
          manager_id: emp_manager,
        },
        function (err) {
          if (err) throw err;
        }
      );
      console.log(`This person has been added. 
                First name: ${emp_firstName}
                Last name: ${emp_lastName} 
                Role: ${emp_role}
                Manager: ${emp_manager}`);
      return setTimeout(init, 2000);
    });
}

function updateEmployeeRole() {}

function getAllRoles() {
  // simple query
  db.query(
    "select r.id as role_id, title, d.name as department_name from roles r join departments d on r.department_id = d.id;",
    function (err, results, fields) {
      console.table(results); // results contains rows returned by server
      //console.log(fields); // fields contains extra meta data about results, if available
      return setTimeout(init, 1000);
    }
  );
}

function addRole() {
  // ask user the role name
  inquirer
    .prompt({
      type: "input",
      name: "role_name",
      message: "What is the new role you would like to add?",
    })
    .then((answer) => {
      console.log("Role " + answer.dept_name + " has been added.");
      // insert response into table
      db.query(
        "INSERT INTO roles (name) VALUES (?)",
        [answer.role_name],

        function (err) {
          if (err) throw err;
          return setTimeout(init, 1000);
        }
      );
    });
}

function getAllDepartments() {
  // simple query
  db.query(
    "select id as department_id, name as department_name from departments;",
    function (err, results, fields) {
      console.table(results); // results contains rows returned by server
      //console.log(fields); // fields contains extra meta data about results, if available
      return setTimeout(init, 1000);
    }
  );
}

function addDepartment() {
  // ask user the department name
  inquirer
    .prompt({
      type: "input",
      name: "dept_name",
      message: "What is the new department you would like to add?",
    })
    .then((answer) => {
      // insert response into table
      db.query(
        "INSERT INTO departments (name) VALUES (?)",
        [answer.dept_name],
        function (err) {
          if (err) throw err;
          return setTimeout(init, 1000);
        }
      );
      console.log("Department " + answer.dept_name + " has been added.");
    });
}

// Function call to initialize app
init();
