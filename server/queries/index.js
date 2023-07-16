const createDepartments = () => {
  return `
      CREATE TABLE departments (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(50),
        business_id INT NOT NULL,
        PRIMARY KEY(id),
        CONSTRAINT fk_business
        FOREIGN KEY(business_id)
        REFERENCES businesses(id)
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
    business_id INT NOT NULL,
    email VARCHAR(100),
    address VARCHAR(255),
    city VARCHAR(100),
    job_title VARCHAR(50),
    department_id INT NOT NULL,
    pin VARCHAR(4),
    image_is_set INT,
    image_url VARCHAR(1000),
    is_checkedin TINYINT,
    shift_id INT,
    is_active TINYINT,
    session_id INT,
    employment_status VARCHAR(20),
    PRIMARY KEY(id),
    FOREIGN KEY(department_id)
    REFERENCES departments(id), 
    FOREIGN KEY(business_id)
    REFERENCES businesses(id),
    FOREIGN KEY(shift_id)
    REFERENCES shifts(id)

  )
  `;
};
const createAttendance = () => {
  return `
  CREATE TABLE attendance(
    id INT NOT NULL AUTO_INCREMENT,
    employee_id INT NOT NULL,
    check_in INT NOT NULL,
    business_id INT NOT NULL,
    check_out INT,
    PRIMARY KEY(id),
    FOREIGN KEY(employee_id)
    REFERENCES employees(id) 
    ON DELETE CASCADE,
    FOREIGN KEY(business_id)
    REFERENCES businesses(id);
  );
  `;
};
const insertManager = () => {
  return `
    INSERT INTO departments(id, name) 
    VALUES(1, 'Administrator'); 
  `;
};
const createBusiness = () => {
  return `
    CREATE TABLE businesses(
      id INT NOT NULL AUTO_INCREMENT,
      business_name VARCHAR(30) NOT NULL,
      owner INT, 
      current_plan VARCHAR(10) NOT NULL,
      created_at INT NOT NULL,
      PRIMARY KEY (id),
    )
  `;
};
const createUser = () => {
  return `
    CREATE TABLE users(
      id INT NOT NULL AUTO_INCREMENT, 
      first_name VARCHAR(20) NOT NULL, 
      last_name VARCHAR(20) NOT NULL,
      email VARCHAR(100) NOT NULL, 
      password VARCHAR(255) NOT NULL,
      business_id INT NOT NULL,
      PRIMARY KEY(id), 
      CONSTRAINT fk_business
      FOREIGN KEY (business_id) 
      REFERENCES businesses(id)
    )
  `;
};
const createPermissionTable = () => {
  return `
    CREATE TABLE permissions(
      id INT NOT NULL AUTO_INCREMENT, 
      name VARCHAR(30) NOT NULL,
      created_at INT NOT NULL,
      PRIMARY KEY(id)
    );
  `;
};
const createRoles = () => {
  return `
  CREATE TABLE roles(
    id INT NOT NULL AUTO_INCREMENT, 
    name VARCHAR(100) NOT NULL, 
    business_id INT NOT NULL,
    created_at INT NOT NULL, 
    PRIMARY KEY(id),
    FOREIGN KEY(business_id)
    REFERENCES businesses(id)
  )
  `;
};
const permissions_of_roles = () => {
  return `
  CREATE TABLE permissions_of_roles(
    permission_id INT NOT NULL, 
    role_id INT NOT NULL, 
    FOREIGN KEY(permission_id) 
    REFERENCES permissions(id)
    FOREIGN KEY(roles)
    REFERENCES roles(id);
  )
  `;
};
const createShifts = () => {
  return `
    CREATE TABLE shifts(
      id INT NOT NULL AUTO_INCREMENT, 
      name VARCHAR(50) NOT NULL, 
      start_time TIME NOT NULL, 
      end_time TIME NOT NULL, 
      business_id INT NOT NULL, 
      PRIMARY KEY(id), 
      CONSTRAINTS fk_shift
      FOREIGN KEY(business_id) 
      REFERENCES businesses(id)
    )
  `;
};
const addLocation = () => {
  return `
        CREATE TABLE business_locations(
            id INT NOT NULL AUTO_INCREMENT, 
            name VARCHAR(100) NOT NULL, 
            address VARCHAR(100), 
            location_unique_name VARCHAR(15) NOT NULL,
            is_active TINYINT NOT NULL,
            business_id INT NOT NULL, 
            PRIMARY KEY(id), 
            CONSTRAINT fk_locations
            FOREIGN KEY (business_id)
            REFERENCES businesses(id)
        )
    `;
};
const employee_locations = () => {
  return `
    CREATE TABLE employee_locations(
      employee_id INT NOT NULL, 
      location_id INT NOT NULL, 
      FOREIGN KEY (employee_id)
      REFERENCES employees(id),
      FOREIGN KEY(location_id)
      REFERENCES business_locations(id)
    )
  `;
};
const createTables = () => {
  return `
    CREATE TABLE businesses(
      id INT NOT NULL AUTO_INCREMENT,
      business_name VARCHAR(30) NOT NULL,
      owner_id INT NOT NULL, 
      current_plan VARCHAR(10) NOT NULL,
      created_at INT NOT NULL,
      PRIMARY KEY (id)
    );

    CREATE TABLE users(
      id INT NOT NULL AUTO_INCREMENT, 
      first_name VARCHAR(20) NOT NULL, 
      last_name VARCHAR(20) NOT NULL,
      email VARCHAR(100) NOT NULL, 
      phone VARCHAR(15) NOT NULL,
      password VARCHAR(255) NOT NULL,
      business_id INT,
      PRIMARY KEY(id), 
    );
  `;
};
module.exports = createTables;
