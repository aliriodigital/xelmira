const Parent = require("../../models/Parent");
const Student = require("../../models/Student");
const User = require("../../models/User");

const controllers = {};

controllers.createView = async (req, res) => {
  const { studentId } = req.params;
  const student = await Student.findById(studentId).lean();
  res.render("parents/parent-new", {
    pageTitle: "New Parent",
    featureTitle: "Create Parent",
    action: "/parent/new/" + studentId,
    studentLink: true,
    student: student,
  });
};

controllers.create = async (req, res) => {
  const { studentId } = req.params;
  const {
    firstname,
    middlename,
    lastname,
    kinship,
    idtype,
    idnumber,
    gender,
    email,
    birthdate,
    phone,
    mobile,
    address,
    notes,
  } = req.body;
  console.log(kinship)
  const mailInUse = await User.findOne({ email: email });
  let error = "";
  if (firstname === "") error = "Enter First Name";
  if (lastname === "") error = "Enter Last Name";
  if (kinship === "Select a kinship") error = "Select a kinship";
  if (idtype === "Select an ID type") error = "Enter an ID Type";
  if (idnumber === "" || /[A-z]/.test(idnumber)) error = "Enter a valid ID Number";
  if (gender === "Select a gender") error = "Enter a Gender";
  if (email === "") error = "Enter an email";
  if (mailInUse) error = "Email already taken. Try a different email";
  if (birthdate === "") error = "Enter a birth date";
  if (phone === "" || /[A-z]/.test(phone)) error = "Enter a valid phone number";
  if (mobile === "" || /[A-z]/.test(mobile))
    error = "Enter a real mobile number";
  if (address === "") error = "Enter an address";
  if (error.length > 0) {
    const student = await Student.findById(studentId).lean();
    res.render("parents/parent-new", {
      pageTitle: "New Parent",
      featureTitle: "Create Parent",
      studentLink: true,
      error: error,
      student,
      firstname,
      middlename,
      lastname,
      kinship,
      idtype,
      idnumber,
      gender,
      email,
      birthdate,
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
    student.firstClass = firstclass;
    student.idType = idtype;
    student.idNumber = idnumber;
    student.gender = gender;
    student.birthDate = birthdate;
    student.phone = phone;
    student.mobile = mobile;
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

// controllers.editView = async (req, res) => {
//   const { id } = req.params;
//   const student = await Student.findById(id).populate("userId").lean();
//   const batches = await Batch.find().lean();
//   if (student.userId.school !== req.user.school) {
//     req.flash("error", "You can not view this route");
//     res.redirect("/students");
//   } else {
//     res.render("students/student-edit", {
//       pageTitle: "Edit Student",
//       featureTitle: "Edit Student",
//       action: "/student/edit/" + id,
//       student: student,
//       batches: batches,
//     });
//   }
// };

// controllers.edit = async (req, res) => {
//   const { id } = req.params;
//   let {
//     firstname,
//     middlename,
//     lastname,
//     batch,
//     firstclass,
//     idtype,
//     idnumber,
//     gender,
//     email,
//     birthdate,
//     insurance,
//     phone,
//     mobile,
//     address,
//     notes,
//   } = req.body;
//   const student = await Student.findById(id).populate("userId");
//   const user = await User.findById({ _id: student.userId._id });
//   const batches = await Batch.find({ school: req.user.school }).lean();
//   const mailInUse = await User.findOne({
//     school: req.user.school,
//     email: email,
//     _id: { $ne: student.userId._id },
//   });
//   if (user.school !== req.user.school) {
//     req.flash("error", "You can not view this route");
//     res.redirect("/students");
//   }
//   let error = "";
//   if (firstname === "") error = "First Name was empty.";
//   if (lastname === "") error = "Last Name was empty.";
//   if (batch === "Select a batch") error = "No batch was selected";
//   if (firstclass === "") error = "No First Class Date was set";
//   if (idtype === "Select an ID type") error = "No ID Type was selected";
//   if (idnumber === "" || /[A-z]/.test(idnumber))
//     error = "ID Number was invalid or empty";
//   if (gender === "Select a gender") error = "Gender was empty";
//   if (email === "") error = "Email was empty";
//   if (mailInUse) error = "Email already taken. Try a different email";
//   if (birthdate === "") error = "No Birth date was set";
//   if (insurance === "") error = "Health Insurance was empty";
//   if (phone === "" || /[A-z]/.test(phone)) error = "Phone was invalid or empty";
//   if (mobile === "" || /[A-z]/.test(mobile))
//     error = "Mobile number was invalid or empty";
//   if (address === "") error = "Address was empty";
//   if (error.length > 0) {
//     req.flash("error", "Error: " + error);
//     res.redirect("/student/edit/" + id);
//   } else {
//     student.firstName = firstname;
//     student.middleName = middlename;
//     student.lastName = lastname;
//     student.batch = batch;
//     student.firstClass = firstclass;
//     student.idType = idtype;
//     student.idNumber = idnumber;
//     student.gender = gender;
//     student.birthDate = birthdate;
//     student.phone = phone;
//     student.mobile = mobile;
//     student.address = address;
//     student.insurance = insurance;
//     student.notes = notes;
//     await student.save();
//     user.name = `${firstname} ${middlename} ${lastname}`;
//     user.email = email;
//     await user.save();
//     res.redirect("/students");
//   }
// };

// controllers.remove = async (req, res) => {
//   const { id } = req.params;
//   const student = await Student.findById(id);
//   const user = await User.findById(student.userId);
//   if (user.school !== req.user.school) {
//     req.flash("error", "You can not view this route");
//     res.redirect("/students");
//   } else {
//     student.remove();
//     user.remove();
//     res.redirect("/students");
//   }
// };

module.exports = controllers;
