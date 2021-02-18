const Role = require("../models/Role");
const Grade = require("../models/Grade");

const initialRoles = async () => {
    try {
        const countRoles = await Role.estimatedDocumentCount();
        if (countRoles > 0) return;

        const roles = await Promise.all([
            new Role({ 
                name: "superadmin",
                school: "xelmira#School",
                creatorUser: "xelmira#User",
            }).save(),
            new Role({ 
                name: "admin",
                school: "xelmira#School",
                creatorUser: "xelmira#User",
            }).save(),
            new Role({ 
                name: "student", 
                school: "xelmira#School",
                creatorUser: "xelmira#User",
            }).save(),
            new Role({ 
                name: "employee", 
                school: "xelmira#School",
                creatorUser: "xelmira#User",
            }).save(),
            new Role({ 
                name: "parent", 
                school: "xelmira#School",
                creatorUser: "xelmira#User",
            }).save(),
        ]);

    } catch (error) {
        console.error(error);
    }
};

const initialGrades = async() => {
    try{
        const countGrades = await Grade.estimatedDocumentCount();
        if(countGrades > 0) return;
        const grades = await Promise.all([
            new Grade({
                name: "Descriptive",
                description: "Skills are assesed and achieved",
                creatorUser: "initial_grade",
            }).save(),
            new Grade({
                name: "Formal score",
                description: "Assessment scale and ranking levels are used",
                creatorUser: "initial_grade",
            }).save(),
            new Grade({
                name: "Grade Point Average",
                description: "Score is averaged.",
                creatorUser: "initial_grade",
            }).save(),
        ])
    } catch(error) {
        console.error(error);

    }
};


module.exports = { initialRoles, initialGrades };