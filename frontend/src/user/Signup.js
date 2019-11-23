import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Layout from '../core/Layout';
import {signup} from '../auth';
//import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './styles/styles.css';

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    studentNo: '',
    classNo: '',
    password: '',
    error: '',
    success: false,
  });

  const {name,  studentNo, classNo, password, success, error} = values;

  const handleChange = name => event => {
    setValues({...values, error: false, [name]: event.target.value});
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({...values, error: false});
    signup({name, studentNo, classNo, password}).then(data => {
      if (data.error) {
        setValues({...values, error: data.error, success: false});
      } else {
        setValues({
          ...values,
          name: '',
          studentNo: '',
          classNo: '',
          password: '',
          error: '',
          success: true,
          test: true,
        });
        
      }
    });
  };

  const signUpForm = () => (
    // <form class="form-horizontal">
    //   <div className="form-group">
    //   <FontAwesomeIcon icon="user" size="2x" fixedWidth />

    //     <label className="text-muted">&nbsp;&nbsp;&nbsp;Name</label>
    //     <input
    //       onChange={handleChange('name')}
    //       type="text"
    //       className="form-control col-sm-5"
    //       value={name}
    //     />
    //   </div>

    //   <div className="form-group">
    //   <FontAwesomeIcon icon="at" size="2x" fixedWidth />
    //     <label className="text-muted">&nbsp;&nbsp;&nbsp;Email</label>
    //     <input
    //       onChange={handleChange('email')}
    //       type="email"
    //       className="form-control col-sm-5"
    //       value={email}
    //     />
    //   </div>

    //   <div className="form-group">
    //   <FontAwesomeIcon icon="key" size="2x" fixedWidth />
    //     <label className="text-muted">&nbsp;&nbsp;&nbsp;Password</label>
    //     <input
    //       onChange={handleChange('password')}
    //       type="password"
    //       className="form-control  col-sm-5"
    //       value={password}
    //     />
    //   </div>
    //   <div className="form-group">
    //     <label className="text-muted">Class Number</label>
    //     <input
    //       onChange={handleChange('classNo')}
    //       type="number"
    //       className="form-control col-sm-3"
    //       value={classNo}
    //     />
    //   </div>
    //   <div className="form-group">
    //     <label className="text-muted">Student Number</label>
    //     <input
    //       onChange={handleChange('studentNo')}
    //       type="number"
    //       className="form-control col-sm-3"
    //       value={studentNo}
    //     />
    //   </div>
    //   <button onClick={clickSubmit} className="">
    //     Sign Up
    //   </button>
    // </form>

    <div className="contain">
      <div className="wrapper">
        <div className="form">
          <form action="">
            <p className="full-width">
              <label className="text-muted" htmlFor="">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={handleChange('name')}
              />
            </p>
        
            <p className="full-width">
              <label className="text-muted" htmlFor="">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={handleChange('password')}
              />
            </p>
            <p>
              <label className="text-muted" htmlFor="">
                Class No.
              </label>
              <input
                type="text"
                className="form-control"
                value={classNo}
                onChange={handleChange('classNo')}
              />
            </p>
            <p>
              <label className="text-muted" htmlFor="">
                Student No.
              </label>
              <input
                type="text"
                className="form-control"
                value={studentNo}
                onChange={handleChange('studentNo')}
              />
            </p>

            <p className="full-width ">
              <button className="signup-btn" onClick={clickSubmit}>
                Send
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );

  const showError = () => (
    <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
      {error}
    </div>
  );

  const showSuccess = () => (
    <div className="alert alert-info" style={{display: success ? '' : 'none'}}>
      New account is created. Please <Link to="/signin">Signin</Link>
    </div>
  );

  const redirectTo = (route) => {
    if (success) {
      return <Redirect to={route} />
    }
  }

  return (
    <Layout
      title="Signup"
      description=""
      className="container-fluid  col-md-8 offset-md-2"
    >
      {showSuccess()}
      {showError()}
      {signUpForm()}
      {redirectTo('/signin')}
    </Layout>
  );
};

export default Signup;
