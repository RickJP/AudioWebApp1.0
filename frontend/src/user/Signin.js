import React, {useState} from 'react';
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
  });

  const {name, password, loading, error, redirectToReferrer} = values;
  const {user} = isAuthenticated();

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
      }
    });
  };

  const signUpForm = () => (
    <div className="card">
      <div className="wrapper">
        <form>
          <div className="">
            <label className="text-muted">Name</label>
            <input
              onChange={handleChange('name')}
              type="text"
              className="form-control col-sm-10"
              value={name}
            />
          </div>

          <div className="form-group">
            <label className="text-muted">Password</label>
            <input
              onChange={handleChange('password')}
              type="password"
              className="form-control  col-sm-10"
              value={password}
            />
          </div>
          <button onClick={clickSubmit} className="signin-btn">
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

  return (
    <Layout
      title="Let's Get Started"
      description=""
      className="container-fluid col-md-8 offset-md-2"
    >
      {showLoading()}
      {showError()}
      {signUpForm()}
      {redirectUser()}
    </Layout>
  );
};

export default Signin;
