let Patient = require("./patient");
let Employee = require("./employee");
let HospitalView = require("./view");

class HospitalController {
  static register(name, password, role) {
    Employee.register(name, password, role, (err, objArr) => {
      if (err) {
        HospitalView.ErrorView(err);
      } else {
        HospitalView.registerView(objArr);
      }
    });
  }

  static async login(name, password) {
    try {
      const employeeData = await Employee.login(name, password);

      HospitalView.loginView(employeeData);

      return employeeData;
    } catch (error) {
      HospitalView.ErrorView(error);
    }
  }

  static async logout() {
    try {
      const employeeData = await Employee.logout();

      HospitalView.logoutView();

      return employeeData;
    } catch (error) {
      HospitalView.ErrorView(error);
    }
  }

  static async addPatient(id, patientName, diseases) {
    try {
      const currentEmployee = await Employee.getCurrentLoggedIn();

      if (!currentEmployee) {
        throw new Error(`Please login first`);
      }
      if (currentEmployee.position !== "doctor") {
        throw new Error(`Only doctor can add patient`);
      }

      const patientData = await Patient.addPatient(id, patientName, diseases);

      HospitalView.addPatientView(patientData);

      return patientData;
    } catch (error) {
      HospitalView.ErrorView(error);
    }
  }

  static async updatePatient(id, patientName, diseases) {
    try {
      const currentEmployee = await Employee.getCurrentLoggedIn();

      if (!currentEmployee) {
        throw new Error(`Please login first`);
      }
      if (currentEmployee.position !== "doctor") {
        throw new Error(`Only doctor can update patient`);
      }

      const patientData = await Patient.updatePatient(
        id,
        patientName,
        diseases
      );

      HospitalView.updatePatientView(patientData);

      return patientData;
    } catch (error) {
      HospitalView.ErrorView(error);
    }
  }

  static async deletePatient(id) {
    try {
      const currentEmployee = await Employee.getCurrentLoggedIn();

      if (!currentEmployee) {
        throw new Error(`Please login first`);
      }
      if (currentEmployee.position !== "doctor") {
        throw new Error(`Only doctor can update patient`);
      }

      const patient = await Patient.deletePatient(id);

      HospitalView.deletePatientView(patient);

      return patient;
    } catch (error) {
      HospitalView.ErrorView(error);
    }
  }

  static async show(dataType) {
    try {
      const currentEmployee = await Employee.getCurrentLoggedIn();

      if (!currentEmployee) {
        throw new Error(`Please login first`);
      }
      if (currentEmployee.position === "admin") {
        if (dataType == "employee") {
          const employees = await Employee.getAllEmployees();
          HospitalView.showEmployeesView(employees);
          return employees;
        } else if (dataType == "patient") {
          const patients = await Patient.getAllPatients();
          HospitalView.showPatientsView(patients);
          return patients;
        } else {
            throw new Error ("Invalid data type. 'employee' and 'patient' is allowed! ")
        }
      } else if (currentEmployee.position === "doctor") {
        if (dataType == "patient") {
          const patients = await Patient.getAllPatients();
          HospitalView.showPatientsView(patients);
          return patients;
        } else {
            throw new Error ("Doctor can see data patient")
        }
      }
    } catch (error) {
      HospitalView.ErrorView(error);
    }
  }

  static async findPatientBy(searchType, searchValue) {
    try {
      const currentEmployee = await Employee.getCurrentLoggedIn();

      if (!currentEmployee) {
        throw new Error("Please login first");
      }
      if (currentEmployee.position !== "doctor") {
        throw new Error("Only doctor can filter");
      }

      let patient;
      if (searchType === "id") {
        patient = await Patient.findById(searchValue);
      }
      if (searchType === "name") {
        const patients = await Patient.getAllPatients();
        patient = patients.find((p) =>
          p.patientName.toLowerCase().includes(searchValue.toLowerCase())
        );
      }

      if (patient) {
        HospitalView.findPatientView(patient);
      } else {
        throw new Error(`Patient not found with ${searchType}: ${searchValue}`);
      }

      return patient;
    } catch (error) {
      HospitalView.ErrorView(error);
      throw error;
    }
  }

  static help() {
    HospitalView.helpView();
  }

  // lanjutkan command yang lain
}

module.exports = HospitalController;
