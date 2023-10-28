const createdAt = Date.now() / 1000;
const createDepartments = () => {
  return `
      CREATE TABLE IF NOT EXISTS departments (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(50),
        created_at INT, 
        updated_at INT,
        business_id INT NOT NULL,
        PRIMARY KEY(id),
        CONSTRAINT fk_business
        FOREIGN KEY(business_id)
        REFERENCES businesses(id)
        ON DELETE CASCADE
      )`;
};

const createEmployeesTable = () => {
  return `
  CREATE TABLE IF NOT EXISTS employees(
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
    manager_id INT NOT NULL,
    is_active TINYINT,
    location_id INT,
    session_id INT,
    employment_status VARCHAR(20),
    PRIMARY KEY(id),
    FOREIGN KEY(department_id)
    REFERENCES departments(id), 
    FOREIGN KEY(business_id)
    REFERENCES businesses(id)
    ON DELETE CASCADE,
    FOREIGN KEY(shift_id)
    REFERENCES shifts(id), 
    FOREIGN KEY(manager_id)
    REFERENCES users(id), 
    FOREIGN KEY(location_id) 
    REFERENCES business_locations(id));
  )
  `;
};
const createAttendance = () => {
  return `
  CREATE TABLE IF NOT EXISTS attendance(
    id INT NOT NULL AUTO_INCREMENT,
    employee_id INT NOT NULL,
    check_in INT NOT NULL,
    business_id INT NOT NULL,
    check_out INT,
    location_id INT,
    check_in_method VARCHAR(20),
    PRIMARY KEY(id),
    FOREIGN KEY(employee_id)
    REFERENCES employees(id) 
    ON DELETE CASCADE,
    FOREIGN KEY(business_id)
    REFERENCES businesses(id)
    ON DELETE CASCADE
  );
  `;
};
const insertManager = () => {
  return `
    INSERT INTO departments (id, name) 
    VALUES(1, 'Administrator'); 
  `;
};
const createBusiness = () => {
  return `
    CREATE TABLE IF NOT EXISTS businesses(
      id INT NOT NULL AUTO_INCREMENT,
      business_name VARCHAR(30) NOT NULL,
      owner INT, 
      current_plan TINYINT NOT NULL,
      created_at INT NOT NULL,
      PRIMARY KEY (id),
    )
  `;
};
const createPermissionTable = () => {
  return `
    CREATE TABLE IF NOT EXISTS permissions(
      id INT NOT NULL AUTO_INCREMENT, 
      name VARCHAR(30) NOT NULL,
      created_at INT NOT NULL,
      PRIMARY KEY(id)
    );
  `;
};
const createRoles = () => {
  return `
  CREATE TABLE IF NOT EXISTS roles(
    id INT NOT NULL AUTO_INCREMENT, 
    name VARCHAR(100) NOT NULL, 
    is_admin TINYINT NOT NULL,
    business_id INT NOT NULL,
    created_at INT, 
    updated_at INT,
    PRIMARY KEY(id),
    FOREIGN KEY(business_id)
    REFERENCES businesses(id)
    ON DELETE CASCADE
  )
  `;
};
const permissions_of_roles = () => {
  return `
  CREATE TABLE IF NOT EXISTS permissions_of_roles(
    permission_id INT NOT NULL, 
    role_id INT NOT NULL, 
    FOREIGN KEY(permission_id) 
    REFERENCES permissions(id),
    FOREIGN KEY(role_id)
    REFERENCES roles(id)
    ON DELETE CASCADE
  );
  `;
};
const createShifts = () => {
  return `
    CREATE TABLE IF NOT EXISTS shifts(
      id INT NOT NULL AUTO_INCREMENT, 
      name VARCHAR(50) NOT NULL, 
      start_time TIME NOT NULL, 
      end_time TIME NOT NULL, 
      business_id INT NOT NULL, 
      PRIMARY KEY(id), 
      CONSTRAINTS fk_shift
      FOREIGN KEY(business_id) 
      REFERENCES businesses(id)
      ON DELETE CASCADE
    )
  `;
};
const addLocation = () => {
  return `
        CREATE TABLE IF NOT EXISTS business_locations(
            id INT NOT NULL AUTO_INCREMENT, 
            name VARCHAR(100) NOT NULL, 
            address VARCHAR(100), 
            city VARCHAR(50),
            country_id INT,
            location_unique_name VARCHAR(15) NOT NULL,
            is_active TINYINT NOT NULL,
            business_id INT NOT NULL, 
            created_at INT, 
            updated_at INT,
            PRIMARY KEY(id),
            FOREIGN KEY countries(id)
            REFERENCES countries(id),
            CONSTRAINT fk_locations
            FOREIGN KEY (business_id)
            REFERENCES businesses(id)
            ON DELETE CASCADE
        )
    `;
};
const employee_locations = () => {
  return `
    CREATE TABLE IF NOT EXISTS employee_locations(
      employee_id INT NOT NULL, 
      location_id INT NOT NULL, 
      FOREIGN KEY (employee_id)
      REFERENCES employees(id)
      ON DELETE CASCADE,
      FOREIGN KEY(location_id)
      REFERENCES business_locations(id)
    )
  `;
};
const InsertRoles = () => {};
const createTables = () => {
  return `
    CREATE TABLE IF NOT EXISTS businesses(
      id INT NOT NULL AUTO_INCREMENT,
      business_name VARCHAR(30) NOT NULL,
      owner_id INT NOT NULL, 
      current_plan VARCHAR(10) NOT NULL,
      created_at INT NOT NULL,
      updated_at INT,
      PRIMARY KEY (id)
    );

    CREATE TABLE IF NOT EXISTS users(
      id INT NOT NULL AUTO_INCREMENT, 
      first_name VARCHAR(20) NOT NULL, 
      last_name VARCHAR(20) NOT NULL,
      email VARCHAR(100) NOT NULL, 
      phone VARCHAR(15) NOT NULL,
      password VARCHAR(255) NOT NULL,
      role_id INT, 
      is_owner TINYINT NOT NULL,
      created_at INT,
      updated_at INT,
      business_id INT,
      PRIMARY KEY(id), 
      FOREIGN KEY(role_id)
      REFERENCES roles(id),
      FOREIGN KEY(business_id)
      REFERENCES businesses(id)
    );
  `;
};

const insertPermissions = () => {
  return `
    INSERT INTO permissions(name, created_at)
    VALUES
    ('employees.view', ${createdAt}), 
    ('employees.create', ${createdAt}), 
    ('employees.edit', ${createdAt}), 
    ('employees.delete', ${createdAt}), 
    ('departments.view', ${createdAt}), 
    ('departments.create', ${createdAt}), 
    ('departments.edit', ${createdAt}), 
    ('departments.delete', ${createdAt}), 
    ('shifts.view', ${createdAt}), 
    ('shifts.create', ${createdAt}), 
    ('shifts.edit', ${createdAt}), 
    ('shifts.delete', ${createdAt}), 
    ('settings.billing', ${createdAt}), 
    ('settings.locations', ${createdAt}), 
    ('settings.account', ${createdAt}), 
    ('settings.roles.view', ${createdAt}), 
    ('settings.roles.create', ${createdAt}), 
    ('settings.roles.edit', ${createdAt}), 
    ('settings.roles.delete', ${createdAt});
  `;
};
module.exports = createTables;
