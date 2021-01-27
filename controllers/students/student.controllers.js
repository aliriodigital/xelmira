const Student = require("../../models/Student");
const User = require("../../models/User");
const Role = require("../../models/Role");

const controllers = {};

controllers.read = async (req, res) => {
  const students = await Student.find().populate("userId").lean();
  console.log(students);
   const users = await User.find({
    school: req.user.school,
    role: "student",
  }).lean();
  res.render("students/students", {
    pageTitle: "Manage Students",
    featureTitle: "Manage Students",
    studentLink: true,
    students: students,
    users: users,
  });
};

controllers.createView = async (req, res) => {
  res.render("students/student-new-edit", {
    pageTitle: "New Student",
    featureTitle: "Create Student",
    action: "/student/new",
    studentLink: true,
  });
};

controllers.create = async (req, res) => {
  const {
    firstname,
    middlename,
    lastname,
    email,
    phone
  } = req.body;
  const mailInUse = await User.findOne({ email: email });
  let error = "";
  if (email.length < 1) {
    error = "Please enter an email and try again";
  }
  if (mailInUse) {
    error = "Email already taken. Please try a different email"
  }
  if (firstname.length < 1) {
    error = "Please enter a name and try again";
  }
  if (error.length > 0) {
    res.render("students/student-new-edit", {
      error: error,
      firstname: firstname,
      middlename: middlename,
      lastname: lastname,
      email: email,
      phone: phone,
    });
  } else {
    const user = await new User(req.body);
    user.name = `${firstname} ${middlename} ${lastname}`;
    user.email = email;
    user.school = req.user.school;
    user.password = await user.encryptPassword(`${firstname}123`);
    user.creatorUser = req.user.id;
    user.role = "student";
    await user.save();
    const student = await new Student({});
    student.school = req.user.school;
    student.creatorUser = req.user.id;
    student.userId = user._id;
    student.firstName = firstname;
    student.middleName = middlename;
    student.lastName = lastname;
    student.phone = phone;
    await student.save();
    console.log(student);
    res.redirect("/students");
  }
};

// controllers.editView = async (req, res) => {
//   const { id } = req.params;
//   const user = await User.findById(id).lean();
//   const roles = await Role.find().lean();
//   // let userRole = user.role === role.name? true : false;
//   if (user.school !== req.user.school) {
//     req.flash("error", "You can not view this route. Try a different one");
//     res.redirect("/users");
//   } else {
//     res.render("users/user-new-edit", {
//       pageTitle: "Edit User",
//       featureTitle: "Edit User",
//       action: "/user/edit/" + id,
//       user: user,
//       roles: roles, 
//     });
//   }
// };

// controllers.edit = async (req, res) => {
//   const { id } = req.params;
//   const { name, email, password } = req.body;
//   let error = "";
//   if (password.length < 1) {
//     error = "Please enter a password and try again";
//   }
//   if (email.length < 1) {
//     error = "Please enter an email and try again";
//   }
//   if (name.length < 1) {
//     error = "Please enter a name and try again";
//   }
//   if (error.length > 0) {
//     req.flash("error", error);
//     res.redirect("/user/edit/" + id);
//   } else {
//     const user = await User.findById(id);
//     if (user.school !== req.user.school) {
//       req.flash("error", "You can not view this route. Try another one.");
//       res.redirect("/users");
//     } else {
//       user.password = await user.encryptPassword(password);
//       user.name = name;
//       user.email = email;
//       user.save();
//       res.redirect("/users");
//     }
//   }
// };

controllers.remove = async (req, res) => {
  const { id } = req.params;
  const student = await Student.findById(id);
  console.log(id);
  // const user = await User.findById(student.userId);
  // if (user.school !== req.user.school) {
  //   req.flash("error", "You can not view this route. Try another one.");
  //   res.redirect("/users");
  // } else {
    student.remove();
    // user.remove();

    res.redirect("/students");
  // }
};

module.exports = controllers;
