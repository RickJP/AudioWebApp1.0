import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import Layout from '../core/Layout';
import {signin, authenticate, isAuthenticated} from '../auth';
import './styles/styles.css';

const Signin = () => {
  const [values, setValues] = useState({
    name: '',
    password: '',
    error: '',
    loading: false,
    redirectToReferrer: false,
    displayedName: false,
  });

  useEffect(() => {
    checkForStoredName();
  });

  const {
    name,
    password,
    loading,
    displayedName,
    error,
    redirectToReferrer,
  } = values;
  const {user, role} = isAuthenticated();

  const handleChange = name => event => {
    setValues({...values, error: false, [name]: event.target.value});
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({...values, error: false, loading: true});
    signin({name, password}).then(data => {
      if (data.error) {
        setValues({...values, error: data.error, loading: false});
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true,
          });
        });
        localStorage.removeItem('uName');
      }
    });
  };

  const signInForm = () => (
    <div className="container  w-80">
      <div className="wrapper">
        <form className="signin-form"> 
          <div className="form-group">
            <label className="text-muted">Name</label>
            <input
              onChange={handleChange('name')}
              type="text"
              className="form-control col-sm-12"
              value={name}
            />
          </div>

          <div className="form-group">
            <label className="text-muted">Password</label>
            <input
              onChange={handleChange('password')}
              type="password"
              className="form-control  col-sm-12"
              value={password}
            />
          </div>
          <button className="m-0" onClick={clickSubmit} className="signin-btn">
            Sign In
          </button>
        </form>
      </div>
    </div>
    
  );

  const showError = () => (
    <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
      {error}
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to="/" />;
      } else {
        return <Redirect to="/" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const checkForStoredName = () => {
    const getName = localStorage.getItem('uName');
    if (localStorage.getItem('uName') && !displayedName) {
      console.log(getName);
      setValues({...values, name: getName, displayedName: true});
    }
  };

  //localStorage.setItem('uName', name);

  return (
    <Layout
      title="Let's Get Started"
      description=""
      className="container-fluid  pt-4"
      showDetails={1}
      jumboHeight={170}
    >
      {showLoading()}
      {showError()}
      {signInForm()}
      {redirectUser()}
    </Layout>
  );
};

export default Signin;
