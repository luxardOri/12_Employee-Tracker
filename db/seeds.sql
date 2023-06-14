INSERT INTO departments (name)
VALUES ("Human Resource"),
       ("Finance"),
       ("Sales"),
       ("Engineering"),
       ("Product Research");

INSERT INTO roles (title,salary,department_id)
VALUES ("Sales Lead",100000,3),
       ("Sales Person",80000,3),
       ("Lead Engineer",150000,4),
       ("Software Engineer",120000,4),
       ("Account Manager",120000,2),
       ("Accountant",90000,2),
       ("Head Researcher",125000,5),
       ("Researcher",85000,5),
       ("HR Admin",80000,1),
       ("HR Recruitment",75000,1);


INSERT INTO employees (first_name,last_name,role_id,manager_id)
VALUES ("Bob","McBob",1,NULL),
       ("Tim","Timothy",2,NULL),
       ("Sookie","Stackhouse",3,NULL),
       ("Bill","Compton",4,NULL),
       ("Eric","Northman",5,NULL),
       ("Pam","De Beaufort",5,5),
       ("Jessica","Hamby",4,4),
       ("Tara","Thornton",3,3),
       ("Lafayette","Reynolds",3,3),
       ("Andy","Bellefleur",1,1),
       ("Jason","Stackhouse",1,1),
       ("Hoyt","Fortenberry",1,1),
       ("Alcide","Herveaux",2,2),
       ("Sam","Merlotte",2,2);