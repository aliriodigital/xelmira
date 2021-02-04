const Student = require("../../models/Student");
const User = require("../../models/User");
const Batch = require("../../models/Batch");
const Role = require("../../models/Role");

const controllers = {};

controllers.read = async (req, res) => {
  const students = await Student.find().populate("userId").lean();
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
  const batches = await Batch.find({ school: req.user.school }).lean();
  res.render("students/student-new", {
    pageTitle: "New Student",
    featureTitle: "Create Student",
    action: "/student/new",
    studentLink: true,
    batches: batches,
  });
};

controllers.create = async (req, res) => {
  const {
    firstname,
    middlename,
    lastname,
    batch,
    firstclass,
    idtype,
    idnumber,
    gender,
    email,
    birthdate,
    insurance,
    phone,
    mobile,
    address,
    notes,
  } = req.body;
  const mailInUse = await User.findOne({ email: email });
  let error = "";
  if (firstname.length < 1) error = "Please enter First Name";
  if (lastname.length < 1) error = "Please enter Last Name";
  if (batch === "Select a batch") error = "Please select a Batch";
  if (firstclass === "") error = "Please enter a First Class Date";
  if (idtype === "Select an ID type") error = "Please enter an ID Type";
  if (idnumber.length < 1) error = "Please enter an ID Number";
  if (gender === "Select a gender") error = "Please enter a Gender";
  if (email.length < 1) error = "Please enter an Email";
  if (mailInUse) error = "Email already taken. Please try a different email";
  if (birthdate.length < 1) error = "Please enter a Birth Date";
  if (insurance.length < 1) error = "Please enter a Health Insurance";
  if (phone.length < 1 || /[A-z]/.test(phone)) error = "Please enter a real phone number";
  if (mobile.length < 1 || /[A-z]/.test(mobile)) error = "Please enter a real mobile number";
  if (address.length < 1) error = "Please enter an address";
  if (error.length > 0) {
    const batches = await Batch.find({ school: req.user.school }).lean();
    res.render("students/student-new", {
      pageTitle: "New Student",
      featureTitle: "Create Student",
      studentLink: true,
      error: error,
      batches,
      firstname,
      middlename,
      lastname,
      batch,
      firstclass,
      idtype,
      idnumber,
      gender,
      email,
      birthdate,
      insurance,
      phone,
      mobile,
      address,
      notes,
    });
  } else {
    const student = await new Student({});
    const user = await new User(req.body);
    student.school = req.user.school;
    student.creatorUser = req.user.id;
    student.userId = user._id;
    student.firstName = firstname;
    student.middleName = middlename;
    student.lastName = lastname;
    student.batch = batch;
    student.firstClass = firstclass,
      student.idType = idtype,
      student.idNumber = idnumber,
      student.gender = gender;
    student.birthdate = birthdate;
    student.phone = phone;
    student.mobile = mobile,
      student.address = address;
    student.insurance = insurance;
    student.notes = notes;
    await student.save();

    user.name = `${firstname} ${middlename} ${lastname}`;
    user.email = email;
    user.school = req.user.school;
    user.password = await user.encryptPassword(`${firstname}123`);
    user.creatorUser = req.user.id;
    user.role = "student";
    await user.save();
    res.redirect("/students");
  }
};

controllers.editView = async (req, res) => {
  const { id } = req.params;
  const student = await Student.findOne({
    school: req.user.school,
    _id: id,
  }).populate("userId").lean();
  const batches = await Batch.find().lean();
  if (student.school !== req.user.school) {
    req.flash("error", "You can not view this route. Try a different one");
    res.redirect("/students");
  } else {
    res.render("students/student-edit", {
      pageTitle: "Edit Student",
      featureTitle: "Edit Student",
      action: "/student/edit/" + id,
      student: student,
      batches: batches,
      // user: user,
      // roles: roles, 
    });
  }
};

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

controllers.profile = async (req, res) => {
  res.render("students/student.profile", {

  })
};

controllers.remove = async (req, res) => {
  const { id } = req.params;
  const student = await Student.findById(id);
  const user = await User.findById(student.userId);
  // if (user.school !== req.user.school) {
  //   req.flash("error", "You can not view this route. Try another one.");
  //   res.redirect("/users");
  // } else {
  student.remove();
  user.remove();

  res.redirect("/students");
  // }
};

module.exports = controllers;
