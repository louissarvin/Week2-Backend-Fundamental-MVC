const fs = require("fs");

class Patient {
  constructor(id, name) {
    this.id = id;
    this.patientName = name;
    this.diseases = [];
  }

  static async addPatient(id, name, diseases) {
    try {
      if (!/^\d+$/.test(id))
        throw new Error("ID pasien harus berupa digit saja.");
    
      let existingPatients = [];

      const data = await fs.promises.readFile("./patient.json", "utf8");
      if (data.trim()) {
        existingPatients = JSON.parse(data);
        if (!Array.isArray(existingPatients)) existingPatients = [];
      }

      const existingPatient = existingPatients.find(
        (patient) => patient.id == id
      );

      if (existingPatient) {
        throw new Error(`Patient with ID '${id}' already exists`);
      }

      const patient = new Patient(id, name);
      patient.diseases = diseases;

      existingPatients.push(patient);

      await fs.promises.writeFile(
        "./patient.json",
        JSON.stringify(existingPatients)
      );

      return patient;
    } catch (error) {
      console.log(`❌ Add patient failed: ${error.message}`);
      throw error;
    }
  }

  static async updatePatient(id, newName, diseases) {
    try {
      const data = await fs.promises.readFile("./patient.json", "utf8");
      const patients = JSON.parse(data);

      const existingPatient = patients.findIndex((patient) => patient.id == id);
      if (existingPatient == -1) {
        throw new Error(`Patient with ID '${id}' not found`);
      }

      patients[existingPatient].patientName = newName;
      patients[existingPatient].diseases = diseases;

      await fs.promises.writeFile("./patient.json", JSON.stringify(patients));

      return patients[existingPatient];
    } catch (error) {
      throw new Error("The data of patient can't be updated");
    }
  }

  static async deletePatient(id) {
    try {
      const data = await fs.promises.readFile("./patient.json", "utf8");
      const patients = JSON.parse(data);

      const existingPatient = patients.findIndex((patient) => patient.id == id);
      if (existingPatient == -1) {
        throw new Error(`Patient with ID '${id}' not found`);
      }

      const deletedPatient = patients.splice(existingPatient, 1)[0];

      await fs.promises.writeFile("./patient.json", JSON.stringify(patients));

      return deletedPatient;
    } catch (error) {
      console.log(`Delete patient failed: ${error.message}`);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const data = await fs.promises.readFile("./patient.json", "utf8");
      const patients = JSON.parse(data);

      const patientId = patients.findIndex((patient) => patient.id == id);

      if (patientId == -1) {
        throw new Error("Patient is not found");
      }

      return patients[patientId];
    } catch (error) {
      console.log(`Get patient by id is failed : ${error.message}`);
      throw error;
    }
  }

  static async getAllPatients() {
    try {
      const data = await fs.promises.readFile("./patient.json", "utf8");
      const employees = JSON.parse(data);

      return employees;
    } catch (error) {
      console.log(`Get all data patient failed: ${error.message}`);
      throw error;
    }
  }
}

module.exports = Patient;
