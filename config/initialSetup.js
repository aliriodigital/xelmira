const Role = require("../models/Role");
const Grade = require("../models/Grade");

const initials = {};

initials.roles = async () => {
  try {
    const countRoles = await Role.estimatedDocumentCount();
    if (countRoles > 0) return;
    await Promise.all([
      new Role({
        name: "hyperadmin",
        description: "Manages system",
        school: "_appRole",
        creatorUser: "_appRole",
      }).save(),
      new Role({
        name: "superadmin",
        description: "Manages school admins",
        school: "_appRole",
        creatorUser: "_appRole",
      }).save(),
      new Role({
        name: "admin",
        description: "Manages one school",
        school: "_appRole",
        creatorUser: "_appRole",
      }).save(),
      new Role({
        name: "student",
        description: "Attend classes",
        school: "_appRole",
        creatorUser: "_appRole",
      }).save(),
      new Role({
        name: "employee",
        description: "Provide classes",
        school: "_appRole",
        creatorUser: "_appRole",
      }).save(),
      new Role({
        name: "parent",
        description: "Student representative",
        school: "_appRole",
        creatorUser: "_appRole",
      }).save(),
    ]);
  } catch (error) {
    console.error(error);
  }
};

initials.grades = async () => {
  try {
    const countGrades = await Grade.estimatedDocumentCount();
    if (countGrades > 0) return;
    await Promise.all([
      new Grade({
        name: "Descriptive",
        description: "Skills are assessed and achieved",
        electiveSubject: null,
        creatorUser: "_appGradeSystem",
        school: "_appGradeSystem",
      }).save(),
      new Grade({
        name: "Colombian System",
        description: "Assessment scale and ranking levels are used",
        electiveSubject: true,
        creatorUser: "_appGradeSystem",
        school: "_appGradeSystem",
      }).save(),
      new Grade({
        name: "Grade Point Average",
        description: "Score is averaged.",
        electiveSubject: true,
        creatorUser: "_appGradeSystem",
        school: "_appGradeSystem",
      }).save(),
    ]);
  } catch (error) {
    console.error(error);
  }
};

module.exports = initials;
