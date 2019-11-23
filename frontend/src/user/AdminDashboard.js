import React from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const AdminDashboard = () => {
  const {
    user: {name, email, role},
  } = isAuthenticated();

  const adminInfo = () => {
    return (
      <div className="card mb-3">
        <h3 className="card-header">User Information</h3>
        <ul className="list-group">
          <li className="list-group-item">
            <FontAwesomeIcon icon="user" size="2x" style={{color: 'green'}} />
            {name}
          </li>
          
          <li className="list-group-item">
          <FontAwesomeIcon icon="lock" size="2x" style={{color: 'red'}}
            />
            {role === 1 ? 'Admin' : 'Student'}
          </li>
        </ul>
      </div>
    );
  };

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

  return (
    <Layout
      title="Dashboard"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-6">{adminInfo()}</div>
        {/* <div className="col-9">{displayListOfStudents()}</div> */}
      </div>
    </Layout>
  );
};

export default AdminDashboard;
