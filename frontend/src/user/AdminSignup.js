import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Layout from '../core/Layout';
import {adminSignup} from '../auth';
//import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './styles/styles.css';

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    password: '',
    error: '',
    success: false,
  });

  const {name, password, success, error} = values;

  const handleChange = name => event => {
    setValues({...values, error: false, [name]: event.target.value});
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({...values, error: false});
    adminSignup({name, password}).then(data => {
      if (data.error) {
        setValues({...values, error: data.error, success: false});
      } else {
        setValues({
          ...values,
          name: '',
          password: '',
          error: '',
          success: true,
          test: true,
        });
        localStorage.setItem('uName', name);
      }
    });
  };

  const signUpForm = () => (
   
  
    <div className="container  w-60">
      <div className="wrapper">
        <div className="signup-form">
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

  // const showSuccess = () => (
  //   <div className="alert alert-info" style={{display: success ? '' : 'none'}}>
  //     New account is created. Please <Link to="/signin">Signin</Link>
  //   </div>
  // );

  const redirectTo = (route) => {
    if (success) {
      return <Redirect to={route} />
    }
  }

  return (
    <Layout
      title="Register"
      description=""
      className="container-fluid p-5"
      showDetails={1}
      jumboHeight={150}
    >
      {/* {showSuccess()} */}
      {showError()}
      {signUpForm()}
      {redirectTo('/signin')}
    </Layout>
  );
};

export default Signup;
