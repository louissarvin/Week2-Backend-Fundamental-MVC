let fs = require("fs");

class Employee {
  constructor(username, password, position) {
    this.username = username;
    this.password = password;
    this.position = position;
    this.login = false;
  }

  static register(name, password, role, cb) {
    this.findAll((err, data) => {
      if (err) {
        console.log(err);
      } else {
        let obj = new Employee(name, password, role);
        let newData = data;
        newData.push(obj);
        let objArr = [];

        objArr.push(obj);
        objArr.push(newData.length);

        fs.writeFile("./employee.json", JSON.stringify(newData), (err) => {
          if (err) {
            console.log(err);
          } else {
            cb(err, objArr);
          }
        });
      }
    });
  }

  // lanjutkan method lain

  static async login(username, password) {
    try {
      const data = await fs.promises.readFile("./employee.json", "utf8");
      const employees = JSON.parse(data);

      const employeeData = employees.find(
        (employee) => employee.username == username
      );

      const alreadyLogin = employees.find(employee => employee.login === true);

      if (alreadyLogin) {
        throw new Error(`User ${alreadyLogin.username} is already logged in`);
      }

      if (!employeeData) {
        throw new Error(`Username : ${username} not found!`);
      } 

      if (employeeData.password !== password) {
        throw new Error(`Invalid password for '${username}'`);
      }

      employeeData.login = true;

      await fs.promises.writeFile("./employee.json", JSON.stringify(employees));

      return employeeData;
    } catch (error) {
      console.log(`Login failed: ${error.message}`);
      throw error;
    }
  }

  static async logout() {
    try {
      const data = await fs.promises.readFile("./employee.json", "utf8");

      const employees = JSON.parse(data);

      const employeeData = employees.find((employee) => employee.login == true);

      if (!employeeData) {
        throw new Error("No employee is currently logged in");
      }

      employeeData.login = false;

      await fs.promises.writeFile("./employee.json", JSON.stringify(employees));

      return employeeData;
    } catch (error) {
      console.log(`Login failed: ${error.message}`);
      throw error;
    }
  }

  static async getCurrentLoggedIn() {
    try {
      const data = await fs.promises.readFile("./employee.json", "utf8");
      const employees = JSON.parse(data);

      const employeeData = employees.find((employee) => employee.login == true);
      return employeeData;
    } catch (error) {
      throw new Error(`Failed to get logged in employee: ${error.message}`);
    }
  }

  static async getAllEmployees() {
    try {
      const data = await fs.promises.readFile("./employee.json", "utf8");
      const employees = JSON.parse(data);

      return employees;
    } catch (error) {
      throw new Error("Failed to get data all employee");
    }
  }

  static findAll(cb) {
    fs.readFile("./employee.json", "utf8", (err, data) => {
      if (err) {
        if (err.code === "ENOENT") {
          cb(null, []); 
        } else {
          cb(err);
        }
      } else {
        try {
          const parsed = data.trim() === "" ? [] : JSON.parse(data);
          cb(null, parsed);
        } catch (e) {
          cb(e);
        }
      }
    });
  }
}

module.exports = Employee;
