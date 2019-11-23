import React, {Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {signout, isAuthenticated} from '../auth';

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return {color: '#ff9900'};
  } else {
    return {color: '#ffffff'};
  }
};

const Menu = ({history}) => (
  <div>
    <ul className="nav nav-tabs bg-dark">
      <li className="nav-item">
        <Link className="nav-link" style={isActive(history, '/')} to="/">
          Home
        </Link>
      </li>

      {/* FOR TEST TAKERS - TEST & DASHBOARD ROUTE */}

      {isAuthenticated() && isAuthenticated().user.role === 0 && (
        <Fragment>
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, '/user/test')}
              to="/user/test"
            >
              Test
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, '/user/dashboard')}
              to="/user/dashboard"
            >
              Dashboard
            </Link>
          </li>
        </Fragment>
      )}

      {/* ADMIN DASHBOARD ROUTE */}

      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <Fragment>
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, '/admin/dashboard')}
              to="/admin/dashboard"
            >
              Dashboard
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, '/admin/listOfStudents')}
              to="/admin/listOfStudents"
            >
              List of Students
            </Link>
          </li>
        </Fragment>
      )}

      {/* SIGNIN & SIGNUP */}

      {!isAuthenticated() && (
        <Fragment>
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, '/signin')}
              to="/signin"
            >
              Sign In
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, '/signup')}
              to="/signup"
            >
              Sign Up
            </Link>
          </li>
        </Fragment>
      )}

      {/* SIGNOUT */}

      {isAuthenticated() && (
        <Fragment>
          <li className="nav-item">
            <span
              className="nav-link"
              style={{cursor: 'pointer', color: '#ffffff'}}
              onClick={() =>
                signout(() => {
                  history.push('/');
                })
              }
            >
              [ Signout ]
            </span>
          </li>
        </Fragment>
      )}
    </ul>
  </div>
);

export default withRouter(Menu);
