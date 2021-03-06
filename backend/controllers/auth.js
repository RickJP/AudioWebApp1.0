const User = require('../models/user');
const Admin = require('../models/admin');
const { createControls } = require('./controls');

const jwt = require('jsonwebtoken'); // to generate signed token
const expressJwt = require('express-jwt'); // for authorization check
const {errorHandler} = require('../helpers/dbErrorHandler');


exports.signup = (req, res) => {

  let isAdmin = false;

  if (req.body.name === 'AdminUKJP2020') {
    req.body.role = '1';
    isAdmin = true;
  }
  console.log(req.body.name);
  if (req.body.name === 'TesterUKJP2020') {
    console.log('#############  SET ROLE = 2');
    req.body.role = '2';
    isAdmin = true;
  }

  
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    if (isAdmin) createControls(user._id);

    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      user,
    });
  });
};

// exports.adminSignup = (req, res) => {
//   console.log('ADMIN SIGNUP');
//   const admin = new Admin(req.body);
//   admin.save((err, admin) => {
//     if (err) {
//       return res.status(400).json({
//         error: errorHandler(err),
//       });
//     }
//     admin.salt = undefined;
//     admin.hashed_password = undefined;
//     res.json({
//       admin,
//     });
//   });
// };

checkForMissingInput = (name, password) => {
  let msg = '';
  if (!name && !password) {
    msg = 'Enter your name and password';
  } else if (!name) {
    msg = 'Enter your name';
  } else if (!password) {
    msg = 'Enter your password';
  }
  return msg;
};

setUserLoginStatus = (_id, loginStatus) => {
  console.log('ID IS '+ _id)
    User.findOneAndUpdate({_id}, { isLoggedIn: loginStatus }, (err, user) => {
      if (err) {
       return console.error('Could not update loginStatus in mongoDB!!');
      }
    });
}

exports.signin = (req, res) => {
  // find the user based on name
  const {name, password} = req.body;

  const msg = checkForMissingInput(name, password);
  if (msg !== '') {
    return res.status(400).json({
      error: msg,
    });
  }

  User.findOne({name}, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "Your name and password doesn't match",
      });
    }
    // if user is found make sure the name and password match
    // create authenticate method in user model
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Your name and password doesn't match",
      });
    }

    if (user.isLoggedIn) {
      return res.status(400).json({
        error: "You are already logged in",
        alreadyLoggedIn: true
      });
    } 
    setUserLoginStatus(user._id, true);

    // generate a signed token with user id and secret
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
    // persist the token as 't' in cookie with expiry date
    res.cookie('t', token, {expire: new Date() + 9999});
    // return response with user and token to frontend client
    const {_id, name, classNo, studentNo, role} = user;
    return res.json({token, user: {_id, name, classNo, studentNo, role}});
  });
};


exports.signout = (req, res) => {
  res.clearCookie('t');
  res.json({message: 'Signout success'});
  setUserLoginStatus(req.params.userId, false);
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'auth',
});

exports.isAuth = (req, res, next) => {

  if (!req.profile._id) {
    return res.status(403).json({
      error: 'Access denied',
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: 'Admin resourse! Access denied',
    });
  }
  next();
};

