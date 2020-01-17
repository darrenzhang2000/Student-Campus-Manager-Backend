const { Student, Campus } = require('../database/models');

const students = require('../data/students');
const campuses = require('../data/campuses');

const populateCampusesTable = async (campuses) =>{
  for(let i = 0; i < campuses.length; i++){
    let currentCampus = campuses[i];
    let saveCampus = await Campus.create(currentCampus);
  }
}

const populateStudentsTable = async (students) =>{
  for(let i = 0; i < students.length; i++){
    let currentStudent = students[i];
    //saves currentStudent into the database
    let saveStudent = await Student.create(currentStudent);
    
    //creates association between student and campus
    let campusId = currentStudent.campus; 
    let campusObject = await Campus.findByPk(campusId);
    await saveStudent.setCampus(campusObject);
  }
}


/*
  {
    studentID: 1
    campusID: 1
  }
*/
const populateEnrollmentsAndStudentCampus = async (idList) =>{
  let campusID = Campus.findByPk(idList.campusID);

  //add campusID as foreign key to student 
  
  //append studentID as foreign key to campus 

}

const seedDatabase = async () => {
  // await Promise.all([
  //   Student.create({
  //     firstName: "Kyrie",
  //     lastName: "Irving",
  //     gpa: 4.0,
  //     image: "www.google.com",
  //     email: "asd",
  //     studentCampus: "hunter"

  //   }),
  //  ]);

  try {
    await populateCampusesTable(campuses);
    await populateStudentsTable(students);
    console.log("Successfully seeded");
  }
  catch(err){
    console.log(err);
    process.exit(1);
  }

}

module.exports = seedDatabase;
