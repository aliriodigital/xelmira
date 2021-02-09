const Student = require("../../models/Student");
const User = require("../../models/User");
const Course = require("../../models/Course");
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
  const countBatches = await Batch.countDocuments();
  if (countBatches < 1) {
    req.flash(
      "error",
      "Create a course and then a batch before creating students"
    );
    res.redirect("/courses");
  }
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
    username,
    password,
    address,
    notes,
  } = req.body;
  const mailInUse = await User.findOne({ email: email });
  let error = "";
  if (firstname === "") error = "Enter First Name";
  if (lastname === "") error = "Enter Last Name";
  if (batch === "Select a batch") error = "Select a Batch";
  if (firstclass === "") error = "Enter a First Class Date";
  if (idtype === "Select an ID type") error = "Enter an ID Type";
  if (idnumber === "" || /[A-z]/.test(idnumber))
    error = "Enter a valid ID Number";
  if (gender === "Select a gender") error = "Enter a Gender";
  if (email === "") error = "Enter an email";
  if (mailInUse) error = "Email already taken. Try a different email";
  if (birthdate === "") error = "Enter a birth date";
  if (insurance === "") error = "Enter a Health Insurance";
  if (phone === "" || /[A-z]/.test(phone)) error = "Enter a valid phone number";
  if (mobile === "" || /[A-z]/.test(mobile))
    error = "Enter a real mobile number";
  if (username.length < 4) error = "Enter a username longer than 4 characters";
  if (address === "") error = "Enter an address";
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
      username,
      password,
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
    user.username = username;
    user.password = await user.encryptPassword(password);
    user.school = req.user.school;
    user.creatorUser = req.user.id;
    user.role = "student";
    await user.save();
    res.redirect("/students");
  }
};

controllers.editView = async (req, res) => {
  const { id } = req.params;
  const student = await Student.findById(id).populate("userId").lean();
  const batches = await Batch.find().lean();
  if (!student || student.school.toString() !== req.user.school.toString()) {
    req.flash("error", "You can not access that route");
    res.redirect("/user/profile");
  } else {
    res.render("students/student-edit", {
      pageTitle: "Edit Student",
      featureTitle: "Edit Student",
      studentLink: true,
      action: "/student/edit/" + id,
      student: student,
      batches: batches,
    });
  }
};

controllers.edit = async (req, res) => {
  const { id } = req.params;
  let {
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
    username,
    password,
    address,
    notes,
  } = req.body;
  const student = await Student.findById(id).populate("userId");
  const user = await User.findById({ _id: student.userId._id });
  const batches = await Batch.find({ school: req.user.school }).lean();
  const mailInUse = await User.findOne({
    school: req.user.school,
    email: email,
    _id: { $ne: student.userId._id },
  });
  if (!student || student.school.toString() !== req.user.school.toString()) {
    req.flash("error", "You can not access that route");
    res.redirect("/user/profile");
  }
  let error = "";
  if (firstname === "") error = "First Name was empty.";
  if (lastname === "") error = "Last Name was empty.";
  if (batch === "Select a batch") error = "No batch was selected";
  if (firstclass === "") error = "No First Class Date was set";
  if (idtype === "Select an ID type") error = "No ID Type was selected";
  if (idnumber === "" || /[A-z]/.test(idnumber))
    error = "ID Number was invalid or empty";
  if (gender === "Select a gender") error = "Gender was empty";
  if (email === "") error = "Email was empty";
  if (mailInUse) error = "Email already taken. Try a different email";
  if (birthdate === "") error = "No Birth date was set";
  if (insurance === "") error = "Health Insurance was empty";
  if (phone === "" || /[A-z]/.test(phone)) error = "Phone was invalid or empty";
  if (mobile === "" || /[A-z]/.test(mobile))
    error = "Mobile number was invalid or empty";
  if (address === "") error = "Address was empty";
  if (error.length > 0) {
    req.flash("error", "Error: " + error);
    res.redirect("/student/edit/" + id);
  } else {
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
    user.username = username;
    user.password = await user.encryptPassword(password);
    user.email = email;
    await user.save();
    res.redirect("/students");
  }
};

controllers.remove = async (req, res) => {
  const { id } = req.params;
  const student = await Student.findById(id);
  const user = await User.findById(student.userId._id);
  res.redirect("/students");
  if (!student || student.school.toString() !== req.user.school.toString()) {
    req.flash("error", "You can not access that route");
    res.redirect("/user/profile");
  } else {
    student.remove();
    user.remove();
    res.redirect("/students");
  }
};

controllers.profile = async (req, res) => {
  const { id } = req.params;
  const student = await Student.findById(id).populate("userId").lean();
  if (student.userId.school.toString() !== req.user.school.toString()) {
    req.flash("error", "You can not access that route");
    res.redirect("/user/profile");
  }
  res.render("students/student-profile", {
    pageTitle: "Student Profile",
    featureTitle: "Student Profile",
    studentLink: true,
    student,
  });
};

module.exports = controllers;
