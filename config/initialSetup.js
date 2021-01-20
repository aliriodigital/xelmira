const Role = require("../models/Role");

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

        console.log(roles);

    } catch (error) {
        console.error(error);
    }
}

module.exports = { initialRoles };