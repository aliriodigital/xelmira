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
        school: "xelmira#School",
        creatorUser: "xelmira#User",
      }).save(),
      new Role({
        name: "superadmin",
        description: "Manages school admins",
        school: "xelmira#School",
        creatorUser: "xelmira#User",
      }).save(),
      new Role({
        name: "admin",
        description: "Manages one school",
        school: "xelmira#School",
        creatorUser: "xelmira#User",
      }).save(),
      new Role({
        name: "student",
        description: "Attend classes",
        school: "xelmira#School",
        creatorUser: "xelmira#User",
      }).save(),
      new Role({
        name: "employee",
        description: "Provide classes",
        school: "xelmira#School",
        creatorUser: "xelmira#User",
      }).save(),
      new Role({
        name: "parent",
        description: "Student representative",
        school: "xelmira#School",
        creatorUser: "xelmira#User",
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
        description: "Skills are assesed and achieved",
        creatorUser: "initial_grade",
        school: "_tenant",
      }).save(),
      new Grade({
        name: "Colombia System",
        description: "Assessment scale and ranking levels are used",
        creatorUser: "initial_grade",
        school: "_tenant",
      }).save(),
      new Grade({
        name: "Grade Point Average",
        description: "Score is averaged.",
        creatorUser: "initial_grade",
        school: "_tenant",
      }).save(),
    ]);
  } catch (error) {
    console.error(error);
  }
};

module.exports = initials;
