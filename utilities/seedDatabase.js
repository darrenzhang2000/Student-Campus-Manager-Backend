const { Student, Campus } = require('../database/models');

const students = require('../data/students');
const campuses = require('../data/campuses');

//Populate the Campus table in the database with campus data (with everything except enrollments)
const populateCampusesTable = async (campuses) =>{
  for(let i = 0; i < campuses.length; i++){
    let currentCampus = campuses[i];
    let saveCampus = await Campus.create(currentCampus);
  }
}

const populateStudentsTable = async (students) => {
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

const seedDatabase = async () => {
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
