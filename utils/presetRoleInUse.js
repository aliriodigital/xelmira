

const presetRoleInUse = (roleName) => {
    const presetRoles = ["superadmin", "admin", "student", "parent", "employee"];
    let roleState = false;
    let i;
    for (i = 0; i < presetRoles.length; i++) {
        if (roleName.toLowerCase() === presetRoles[i]) {
            roleState = true;
            break;
        }
    }
    return roleState;
};

module.exports = {
    presetRoleInUse,
};