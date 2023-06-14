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
VALUES ("Bob","McBob",9,NULL),
       ("Tim","Timothy",5,NULL),
       ("Sookie","Stackhouse",1,NULL),
       ("Bill","Compton",3,NULL),
       ("Eric","Northman",7,NULL),
       ("Pam","De Beaufort",8,5),
       ("Jessica","Hamby",4,4),
       ("Tara","Thornton",2,3),
       ("Lafayette","Reynolds",2,3),
       ("Andy","Bellefleur",10,1),
       ("Jason","Stackhouse",10,1),
       ("Hoyt","Fortenberry",10,1),
       ("Alcide","Herveaux",6,2),
       ("Sam","Merlotte",6,2);