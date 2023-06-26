const createDepartments = () => {
  return `
      CREATE TABLE departments (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(50),
        PRIMARY KEY(id)
      )`;
};

const createEmployeesTable = () => {
  return `
  CREATE TABLE employees(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    middle_name VARCHAR(100),
    mobile VARCHAR(20),
    email VARCHAR(100),
    address VARCHAR(255),
    city VARCHAR(100),
    job_title VARCHAR(50),
    department_id INT NOT NULL,
    pin VARCHAR(4),
    image_is_set INT,
    image_url VARCHAR(1000),
    is_checkedin INT,
    session_id INT,
    PRIMARY KEY(id),
    FOREIGN KEY(department_id)
    REFERENCES departments(id)
  );
  `;
};
const createAttendance = () => {
  return `
  CREATE TABLE attendance(
    id INT NOT NULL AUTO_INCREMENT,
    employee_id INT NOT NULL,
    check_in INT NOT NULL,
    check_out INT,
    PRIMARY KEY(id),
    FOREIGN KEY(employee_id)
    REFERENCES employees(id)
  );
  `;
};
const insertManager = () => {
  return `
    INSERT INTO departments(id, name) 
    VALUES(1, 'Administrator'); 
  `;
};
const createTables = () => {
  return (
    createAttendance(),
    createDepartments(),
    createEmployeesTable(),
    insertManager()
  );
};
module.exports = createTables;
