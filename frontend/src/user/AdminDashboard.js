import React, {Component, useEffect, useState} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// import Checkbox from "./Checkbox";
import {API} from '../config';
import axios from 'axios';

export default class AdminDashboard extends Component {
  constructor(props) {
    super(props);

    const {
      token,
      user: {name, role, _id},
    } = isAuthenticated();
    this.state = {
      name,
      role,
      _id,
      token,

      loginDisabled: false,
      registerDisabled: false,
      tasksActive: [],

      gotControls: false,
    };

    this.adminInfo = () => {
      return (
        <div className="card mb-3">
          <h3 className="card-header">User Information</h3>
          <ul className="list-group">
            <li className="list-group-item">
              <FontAwesomeIcon icon="user" size="2x" style={{color: 'green'}} />
              {this.state.name}
            </li>

            <li className="list-group-item">
              <FontAwesomeIcon icon="lock" size="2x" style={{color: 'red'}} />
              {this.state.role === 1 ? 'Admin' : 'Student'}
            </li>
          </ul>
        </div>
      );
    };

    this.controls = () => {
      return (
        <div className="card mb-3">
          <h3 className="card-header">Controls</h3>
          <button onClick={this.updateControls}>Update</button>
          <ul className="list-group">
            <li className="list-group-item">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="task1"
                  value="option1"
                  checked={!!this.state.tasksActive[0]}
                  onChange={this.controlHandler}
                />
                <label className="form-check-label" htmlFor="inlineCheckbox1">
                  Task One
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="task2"
                  value="option1"
                  checked={!!this.state.tasksActive[1]}
                  onChange={this.controlHandler}
                />
                <label className="form-check-label" htmlFor="inlineCheckbox1">
                  Task Two
                </label>
              </div>
              <br />

              {/* <FontAwesomeIcon icon="user" size="2x" style={{color: 'green'}} />
              {name} */}
            </li>
            <li className="list-group-item">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="allowSignup"
                  value="option1"
                  checked={!this.state.registerDisabled}
                  onChange={this.controlHandler}
                />
                <label className="form-check-label" htmlFor="inlineCheckbox1">
                  Allow Signup
                </label>
              </div>

              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="allowSignin"
                  value="option1"
                  checked={!this.state.loginDisabled}
                  onChange={this.controlHandler}
                />
                <label className="form-check-label" htmlFor="inlineCheckbox1">
                  Allow Signin
                </label>
              </div>
            </li>
          </ul>
        </div>
      );
    };

    this.controlHandler = e => {
      const tcopy = this.state.tasksActive.slice();

      switch (e.target.id) {
        case 'task1':
            tcopy[0] = e.target.checked;
            this.setState({ tasksActive: tcopy });
          break;
        case 'task2':
            tcopy[1] = e.target.checked;
            this.setState({ tasksActive: tcopy });
          break;

        case 'allowSignin':
            this.setState(prev => ({
              loginDisabled: !prev.loginDisabled
            }));
          break;

        case 'allowSignup':
            this.setState(prev => ({
              registerDisabled: !prev.registerDisabled
            }));
          break;

        default:
      }
    };

    this.updateControls = () => {

      const config = {headers: {Authorization: 'bearer ' + token}};
      const url = `${API}/controls/${_id}`;

      const data = {
        loginDisabled: this.state.loginDisabled,
        registerDisabled: this.state.registerDisabled,
        tasksActive: this.state.tasksActive
      }

      axios
        .put(url, data, config)
        .then(res => {
          
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });  
    }



    this.getControls = () => {
      const config = {headers: {Authorization: 'bearer ' + token}};
      const url = `${API}/controls/${_id}`;
      // console.log(token, url);

      axios
        .get(url, config)
        .then(res => {
          // console.log(res.data.controls[0].loginDisabled);
          const controls = res.data.controls[0];
          this.setState({
            loginDisabled: controls.loginDisabled,
            registerDisabled: controls.registerDisabled,
            tasksActive: controls.tasksActive,
            gotControls: true,
          });
          // this.setState(() => ({
            
          // }));
        })
        .catch(err => {
          console.log(err);
        });
    };
  }

  componentDidUpdate() {}

  render() {
    return (
      <Layout title="Dashboard" className="container-fluid" jumboHeight={20}>
        <div className="row dashboard">
          <div className="col-7 user-info">{this.adminInfo()}</div>
          <div className="col-9">{this.controls()}</div>
          {/* <div className="col-9">{displayListOfStudents()}</div> */}
          {!this.state.gotControls ? this.getControls() : null}
        </div>
      </Layout>
    );
  }
}

// const displayListOfStudents = () => {
//     return (
//         <div className="card mb-5">
//             <h3 className="card-header">Registered List of Students</h3>
//             <ul className="list-group columns " data-columns="2">

//                 <li className="list-group-item">

//                 </li>
//             </ul>
//         </div>
//     )
// }
