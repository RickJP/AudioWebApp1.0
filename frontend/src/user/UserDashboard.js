import React from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const Dashboard = () => {
  const {
    user: {name },
  } = isAuthenticated();
//   const userLinks = () => {
//     return (
//       <div className="card">
//         <h4 className="card-header">User Links</h4>
//         <ul className="list-group">
//           <li className="list-group-item"></li>
//           <li className="list-group-item">
//             <Link className="nav-link" to={`/profile/${_id}`}>
//               Update Profile
//             </Link>
//           </li>
//         </ul>
//       </div>
//     );
//   };

  const userInfo = () => {
  
    return (
      <div className="card mb-5">
        <h3 className="card-header">User Information</h3>
        <ul className="list-group">
          <li className="list-group-item">
            <FontAwesomeIcon icon="user" size="2x" style={{color: 'green'}} />
            <p className="text-primary">{name}  (Student)</p>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Layout title="Dashboard" description={``} className="container-fluid">
      <div className="row">
        {/* <div className="col-3">{userLinks()}</div> */}
        <div className="col-8">{userInfo()}</div>
      </div>
    </Layout>
  );
};

export default Dashboard;
