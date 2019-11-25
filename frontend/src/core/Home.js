import React from 'react';
import Layout from './Layout';
import {Link, withRouter} from 'react-router-dom';
import './styles/styles.css';

const Home = () => {
  // eslint-disable-next-line no-undef
  localStorage.removeItem('uName');
  return (
    <Layout
      title="Home"
      description="From Temple University"
      className="container-fluid"
    >
      <div className="container">
        <div className="wrapper">
            <div className="card p-0 ">
              <Link to={{ pathname: '/user/test', state: { taskNo: 1} }} className="task-btn">TASK ONE</Link>
            </div>
            
            <div className="card p-0 pt-5">
              <Link to={{ pathname: '/user/test', state: { taskNo: 2} }} className="task-btn">TASK TWO</Link>
            </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
