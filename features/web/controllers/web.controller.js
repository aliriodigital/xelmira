const User = require("../../users/models/user.model");

const controller = {};

controller.home = (req, res) => {
  res.render('home', {
    layout: 'web',
    pageTitle: 'Xelmira'
  });
};

controller.signupForm = (req, res) => {
  res.render('signup', {
    layout: 'web',
    pageTitle: 'Signup',
    bodyGray: true
  });
};

controller.signup = async(req, res) => {
  const {username, email, password, confirmPassword} = req.body;
  const user = new User(req.body);
  await user.save();
  req.flash('successMsg', 'Your registration was done!');
  res.redirect('/user');
};

controller.signinForm = (req, res) => {
  res.send('SignIn right now')
};

controller.signin = (req, res) => {
  res.send('Post SignIn')
};

controller.logout = (req, res) => {
  res.send('logout now');
};

controller.faqs = (req, res) => {
  res.render('faqs', {
    layout: 'web'
  });
}

module.exports = controller;
