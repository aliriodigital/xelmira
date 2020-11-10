const Role = require("../models/Role");

const initialRoles = async () => {
    try {
        const countRoles = await Role.estimatedDocumentCount();
        if(countRoles > 0) return;

        const roles = await Promise.all([
            new Role({name: "superadmin"}).save(),
            new Role({name: "admin"}).save(),
            new Role({name: "student"}).save(),
            new Role({name: "employee"}).save(),
            new Role({name: "parent"}).save(),
        ]);

        console.log(roles);

    } catch (error) {
        console.error(error);
    }
}

module.exports = { initialRoles };