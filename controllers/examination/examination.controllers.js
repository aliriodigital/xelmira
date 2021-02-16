const Student = require("../../models/Student");
const User = require("../../models/User");
const Parent = require("../../models/Parent");
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
  res.render("examination/examination", {
    pageTitle: "Examination",
    featureTitle: "Examination",
    examinationLink: true,
    // students: students,
    // users: users,
  });
};

// controllers.createView = async (req, res) => {
//   const batches = await Batch.find({ school: req.user.school }).lean();
//   const countBatches = await Batch.countDocuments();
//   if (countBatches < 1) {
//     req.flash(
//       "error",
//       "Create a course and then a batch before creating students"
//     );
//     res.redirect("/courses");
//   }
//   res.render("students/student-new", {
//     pageTitle: "New Student",
//     featureTitle: "Create Student",
//     action: "/student/new",
//     studentLink: true,
//     batches: batches,
//   });
// };

// controllers.create = async (req, res) => {
//   const {
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
//     username,
//     password,
//     address,
//     notes,
//   } = req.body;
//   const usernameInUse = await User.findOne({ username: username });
//   let error = "";
//   if (firstname === "") error = "Enter First Name";
//   if (lastname === "") error = "Enter Last Name";
//   if (batch === "Select A Batch") error = "Select a Batch";
//   if (firstclass === "") error = "Enter a First Class Date";
//   if (idtype === "Select An ID Type") error = "Enter an ID Type";
//   if (idnumber === "" || /[A-z]/.test(idnumber))
//     error = "Enter a valid ID Number";
//   if (gender === "Select A Gender") error = "Enter a Gender";
//   if (email.length < 4) error = "Email must be longer than 4 characters";
//   if (birthdate === "") error = "Enter a birth date";
//   if (insurance === "") error = "Enter a Health Insurance";
//   if (phone === "" || /[A-z]/.test(phone)) error = "Enter a valid phone number";
//   if (mobile === "" || /[A-z]/.test(mobile))
//     error = "Enter a real mobile number";
//   if (username.length < 4) error = "Enter a username longer than 4 characters";
//   if (usernameInUse) error = "Username already taken. Try a different username";
//   if (password.length < 4) error = "Password must be longer than 4 characters";
//   if (address === "") error = "Enter an address";
//   if (error.length > 0) {
//     const batches = await Batch.find({ school: req.user.school }).lean();
//     res.render("students/student-new", {
//       pageTitle: "New Student",
//       featureTitle: "Create Student",
//       studentLink: true,
//       error: error,
//       batches,
//       firstname,
//       middlename,
//       lastname,
//       batch,
//       firstclass,
//       idtype,
//       idnumber,
//       gender,
//       email,
//       birthdate,
//       insurance,
//       phone,
//       mobile,
//       username,
//       password,
//       address,
//       notes,
//     });
//   } else {
//     const student = await new Student({});
//     const user = await new User(req.body);
//     student.userId = user._id;
//     student.school = req.user.school;
//     student.creatorUser = req.user.id;
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
//     user.username = username;
//     user.password = await user.encryptPassword(password);
//     user.school = req.user.school;
//     user.creatorUser = req.user.id;
//     user.role = "student";
//     await user.save();
//     res.redirect("/students");
//   }
// };

// controllers.editView = async (req, res) => {
//   const { id } = req.params;
//   const student = await Student.findById(id).populate("userId").lean();
//   const batches = await Batch.find().lean();
//   if (!student || student.school.toString() !== req.user.school.toString()) {
//     req.flash("error", "You can not access that route");
//     res.redirect("/user/profile");
//   } else {
//     res.render("students/student-edit", {
//       pageTitle: "Edit Student",
//       featureTitle: "Edit Student",
//       studentLink: true,
//       action: "/student/edit/" + id,
//       student: student,
//       batches: batches,
//     });
//   }
// };

// controllers.edit = async (req, res) => {
//   const { id } = req.params;
//   const {
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
//     username,
//     password,
//     address,
//     notes,
//   } = req.body;
//   const student = await Student.findById(id).populate("userId");
//   const user = await User.findById({ _id: student.userId._id });
//   const batches = await Batch.find({ school: req.user.school }).lean();
//   const usernameInUse = await User.findOne({
//     username: username,
//     _id: { $ne: student.userId._id },
//   });
//   if (!student || student.school.toString() !== req.user.school.toString()) {
//     req.flash("error", "You can not access that route");
//     res.redirect("/user/profile");
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
//   if (email.length < 4) error = "Email was less than 4 characters";
//   if (usernameInUse)
//     error = "Username already taken. Try a different username.";
//   if (username.length < 4) error = "Username was less than 4 characters";
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
//     user.username = username;
//     user.password = await user.encryptPassword(password);
//     user.email = email;
//     await user.save();
//     res.redirect("/students");
//   }
// };

// controllers.remove = async (req, res) => {
//   const { id } = req.params;
//   const student = await Student.findById(id);
//   const user = await User.findById(student.userId._id);
//   res.redirect("/students");
//   if (!student || student.school.toString() !== req.user.school.toString()) {
//     req.flash("error", "You can not access that route");
//     res.redirect("/user/profile");
//   } else {
//     student.remove();
//     user.remove();
//     res.redirect("/students");
//   }
// };

// controllers.profile = async (req, res) => {
//   const { id } = req.params;
//   const student = await Student.findById(id).populate("userId").lean();
//   const parents = await Parent.find({ studentId: id })
//     .populate("studentId")
//     .populate("userId");

//   if (student.userId.school.toString() !== req.user.school.toString()) {
//     req.flash("error", "You can not access that route");
//     res.redirect("/user/profile");
//   }
//   res.render("students/student-profile", {
//     pageTitle: "Student Profile",
//     featureTitle: "Student Profile",
//     studentLink: true,
//     student,
//     parents,
//   });
// };

// controllers.parentCreateView = async (req, res) => {
//   const { id } = req.params;
//   const student = await Student.findById(id).lean();
//   const representativeExists = await Parent.findOne({
//     studentId: id,
//     representative: { $in: [true] },
//   });
//   res.render("parents/parent-new", {
//     pageTitle: "New Parent",
//     featureTitle: "Create Parent",
//     studentLink: true,
//     student: student,
//     representativeExists,
//   });
// };

// controllers.parentCreate = async (req, res) => {
//   const { id } = req.params;
//   const {
//     firstName,
//     middleName,
//     lastName,
//     kinship,
//     idType,
//     idNumber,
//     gender,
//     email,
//     birthDate,
//     phone,
//     mobile,
//     username,
//     password,
//     address,
//     notes,
//     representative,
//   } = req.body;
//   const student = await Student.findById(id).lean();
//   const usernameInUse = await User.findOne({ username: username });
//   let error = "";
//   if (firstName === "") error = "Enter First Name";
//   if (lastName === "") error = "Enter Lastname";
//   if (kinship === "") error = "Enter Kinship";
//   if (idType === "Select An ID type") error = "Select an ID Type";
//   if (idNumber === "" || /[A-z]/.test(idNumber))
//     error = "Enter a valid ID number";
//   if (gender === "Select A Gender") error = "Enter a gender";
//   if (email.length < 4) error = "Email must be longer than 4 characters";
//   if (birthDate === "") error = "Enter a birthdate";
//   if (phone === "" || /[A-z]/.test(phone)) error = "Enter a valid phone";
//   if (mobile === "" || /[A-z]/.test(phone)) error = "Enter a valid mobile";
//   if (usernameInUse)
//     error = `${username} already taken. Try a different username`;
//   if (username.length < 4) error = "Username must be longer than 4 characters";
//   if (password.length < 4) error = "Password must be longer than 4 characters";
//   if (address === "") error = "Enter an address";
//   if (error.length > 0) {
//     res.render("parents/parent-new", {
//       pageTitle: "New Parent",
//       featureTitle: "Create Parent",
//       studentLink: true,
//       student: student,
//       error: error,
//       firstName,
//       middleName,
//       lastName,
//       kinship,
//       idType,
//       idNumber,
//       gender,
//       email,
//       birthDate,
//       phone,
//       mobile,
//       username,
//       password,
//       address,
//       notes,
//       representative,
//     });
//   } else {
//     const student = await Student.findById(id);
//     const newParent = await new Parent(req.body);
//     const newUser = await new User(req.body);
//     newParent.userId = newUser._id;
//     newParent.school = req.user.school;
//     newParent.creatorUser = req.user._id;
//     newParent.studentId = student._id;
//     newParent.representative = representative;
//     await newParent.save();

//     newUser.school = req.user.school;
//     newUser.creatorUser = req.user._id;
//     newUser.role = "parent";
//     newUser.name = `${firstName} ${middleName} ${lastName}`;
//     newUser.password = await newUser.encryptPassword(password);
//     await newUser.save();
//     res.redirect("/student/profile/" + id);
//   }
// };

// controllers.parentEditView = async (req, res) => {
//   const { id, parentId } = req.params;
//   const parent = await Parent.findById(parentId)
//     .populate("studentId")
//     .populate("userId");
//   const student = await Student.findById(id).lean();
//   res.render("parents/parent-edit", {
//     pageTitle: "Edit Parent",
//     featureTitle: "Edit Parent",
//     studentLink: true,
//     parent: parent,
//     student: student,
//   });
// };

// controllers.parentEdit = async (req, res) => {
//   const { id, parentId } = req.params;
//   const {
//     firstName,
//     middleName,
//     lastName,
//     kinship,
//     idType,
//     idNumber,
//     gender,
//     email,
//     birthDate,
//     phone,
//     mobile,
//     username,
//     password,
//     address,
//     notes,
//     representative,
//   } = req.body;

//   const parent = await Parent.findById(parentId)
//     .populate("userId")
//     .populate("studentId");
//   // const notCurrentParents = await Parent.find({
//   //   studentId: id,
//   //   _id: { $ne: parentId },
//   // });
//   const student = await Student.findById(id).lean();
//   const user = await User.findById(parent.userId._id);
//   const usernameInUse = await User.findOne({
//     username: username,
//     _id: { $ne: parent.userId._id },
//   });
//   let error = "";
//   if (firstName === "") error = "Enter First Name";
//   if (lastName === "") error = "Enter Lastname";
//   if (kinship === "") error = "Enter Kinship";
//   if (idType === "Select An ID type") error = "Select an ID Type";
//   if (idNumber === "" || /[A-z]/.test(idNumber))
//     error = "Enter a valid ID number";
//   if (gender === "Select A Gender") error = "Enter a gender";
//   if (email.length < 4) error = "Email must be longer than 4 characters";
//   if (birthDate === "") error = "Enter a birthdate";
//   if (phone === "" || /[A-z]/.test(phone)) error = "Enter a valid phone";
//   if (mobile === "" || /[A-z]/.test(phone)) error = "Enter a valid mobile";
//   if (usernameInUse)
//     error = `${username} already taken. Try a different username`;
//   if (username.length < 4) error = "Username must be longer than 4 characters";
//   if (address === "") error = "Enter an address";
//   if (error.length > 0) {
//     req.flash("error", error);
//     res.redirect("/student/" + id + "/parent/" + parentId + "/edit");
//   } else {
//     parent.firstName = firstName;
//     parent.middleName = middleName;
//     parent.lastName = lastName;
//     parent.kinship = kinship;
//     parent.idType = idType;
//     parent.idNumber = idNumber;
//     parent.gender = gender;
//     parent.email = email;
//     parent.birthDate = birthDate;
//     parent.phone = phone;
//     parent.mobile = mobile;
//     parent.username = username;
//     parent.password = password;
//     parent.address = address;
//     parent.notes = notes;
//     parent.representative = representative;
//     await parent.save();

//     const emergencyParent = await Parent.find({
//       studentId: id,
//       representative: true,
//     });

//     if (emergencyParent.length < 1) {
//       parent.representative = true;
//       await parent.save();
//     } else {
//       parent.representative = representative;
//       await parent.save();
//     }

//     const notCurrentParents = await Parent.find({
//       studentId: id,
//       _id: { $ne: parentId },
//     });

//     if (parent.representative) {
//       notCurrentParents.forEach((parent) => {
//         parent.representative = null;
//         parent.save();
//       });
//     }

//     user.name = `${firstName} ${middleName} ${lastName}`;
//     user.email = email;
//     user.username = username;
//     user.password = await user.encryptPassword(password);
//     await user.save();
//     res.redirect("/student/profile/" + id);
//   }
// };

// controllers.parentRemove = async (req, res) => {
//   const { id, parentId } = req.params;
//   const parent = await Parent.findById(parentId)
//     .populate("userId")
//     .populate("studentId");
//   const user = await User.findById({ _id: parent.userId._id });
//   if (!parent || parent.school.toString() !== req.user.school.toString()) {
//     req.flas("error", "You can not access that route");
//     res.redirect("/student/profile" + id);
//   } else if (parent.representative) {
//     req.flash("error", "Emergency parent can not be removed");
//     res.redirect("/student/profile/" + id);
//   } else {
//     await parent.remove();
//     await user.remove();
//     res.redirect("/student/profile/" + id);
//   }
// };


module.exports = controllers;
