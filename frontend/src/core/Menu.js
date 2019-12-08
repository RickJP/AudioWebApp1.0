import React, {Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {signout, isAuthenticated} from '../auth';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return {color: '#ff9900'};
  } else {
    return {color: '#ffffff'};
  }
};

if (localStorage.getItem('jwt') === '{}')  localStorage.removeItem('jwt');

const Menu = ({history}) => (
  <div>
    <ul className="nav nav-tabs bg-dark">
      {isAuthenticated() && (
        <li className="nav-item">
          <Link className="nav-link" style={isActive(history, '/')} to="/">
            Home
          </Link>
        </li>
      )}

      {/* FOR TEST TAKERS - TEST & DASHBOARD ROUTE */}
      {isAuthenticated() && isAuthenticated().user.role === 0 && (
        <Fragment>
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

          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, '/admin/getRecordings')}
              to="/admin/getRecordings"
            >
              Get Recordings
            </Link>
          </li>
        </Fragment>
      )}

      {isAuthenticated() && isAuthenticated().user.role === 2 && (
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
              style={isActive(history, '/timer')}
              to="/timer"
            >
              Timer
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, '/filelist')}
              to="/filelist"
            >
              FList
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, '/ulfiles')}
              to="/ulfiles"
            >
              ULFiles
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
              style={isActive(history, '/signup')}
              to="/signup"
            >
              Register
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, '/signin')}
              to={{pathname: '/signin', state: {admin: 0}}}
            >
              Login
            </Link>
          </li>


   {/* ADMIN SIGNUP */}

          {/* <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, '/adminSignup')}
              to={{pathname: '/adminSignup', state: {admin: 1}}}
            >
              <FontAwesomeIcon
                icon="lock"
                size="1x"
                style={{color: 'red', float: 'right'}}
              />
            </Link>
          </li> */}
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
