class HospitalView {
    static registerView(objArr) {
        console.log(`save data success, {"username":${objArr[0].username},"password":${objArr[0].password},"role":${objArr[0].position}}. Total employee : ${objArr[1]}`)
    }

    static loginView(objArr) {
        console.log(`save data success, {"username": ${objArr.username}} as a ${objArr.position}, success login!`)
    }

    static logoutView() {
        console.log(`save data success, success logout!`);
    }
    
    static addPatientView(objArr) {
        console.log(`save data success, {"id": ${objArr.id}, "name": ${objArr.patientName}, "diseases": [${objArr.diseases}]}, successfully added!`)
    }

    static updatePatientView(objArr) {
        console.log(`save data success, {"id": ${objArr.id}, "name": ${objArr.patientName}, "diseases": [${objArr.diseases}]}, successfully changed!`)
    }

    static deletePatientView(objArr) {
        console.log(`save data success, patient with {"id": ${objArr.id}} have been successfully deleted!`)
    }

    static showEmployeesView(objArr) {
        console.log(`Total Employee: ${objArr.length}\n`);
        console.log(`Detail employee :`)
        objArr.map((employee) => {
            console.log(employee)
        })
    }

    static showPatientsView(objArr) {
        console.log(`Total Patients: ${objArr.length} \n`)
        console.log(`Detail Patients : `)
        objArr.map(patient => {
            console.log(patient)
        })
    }
    // lanjutkan method lain

    static findPatientView(objArr){
        console.log(`Detail patient : {id : ${objArr.id}, name : ${objArr.patientName}, diseases: ${objArr.diseases}}`)
    }

    static ErrorView(error) {
        console.log(`${error.message}`);
    }

    static helpView() {
        console.log("node index.js register <username> <password> <jabatan> \n node index.js login <username> <password> \n node index.js addPatient <id> <namaPasien> <penyakit1> <penyakit2> .... \n node index.js updatePatient <id> <namaPasien> <penyakit1> <penyakit2> .... \n node index.js deletePatient <id> <namaPasien> <penyakit1> <penyakit2> .... \n node index.js logout \n node index.js show <employee/patient> \n node index.js findPatientBy: <name/id> <namePatient/idPatient></penyakit2>")
    }
}


module.exports = HospitalView;