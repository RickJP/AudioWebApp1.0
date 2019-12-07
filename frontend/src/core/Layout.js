import React from 'react';
import Menu from './Menu';
import PropTypes from 'prop-types';

import '../styles.css';
import 'bootstrap-material-design/dist/css/bootstrap-material-design.min.css';

const Details = ({showDetails}) =>
  showDetails ? (
    <div className="details">
      <div className="row">
        <div className="column">
          <div className="contact-info">
            <p>Bartolo Bazan</p>
            <p>Working Memory Measures</p>
            <p>bazanlinkin2@gmail.com</p>
          </div>
        </div>

        <div className="column">
          <div className="citation-info">
            <p>How to cite:</p>
            <div className="citation">
              <p>Bazan, B. (n.d.). </p>
              <p> Working Memory Measures (Version 1)</p>
              <p>Retrieved from https://english4all.live</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;

const Layout = ({className, children, showDetails, jumboHeight = 20}) => (
  <div>
    <div
      className="jumbotron jumbotron-fluid m-0 pt-1  rounded-0"
      style={{height: jumboHeight}}
    >
      {/* <div className="container">
        <h2 className="display-1"></h2>
        Bartolo Bazan
        {/* <p class="lead">
          Good Luck!
        </p> */}
      {/* <div className="container"> */}
      <Details showDetails={showDetails}></Details>
    </div>
    {/* </div> */}

    <Menu />

    {/* <div className="jumbotron">
            <h2>{title}</h2>
            <p className="lead">{description}</p>
        </div> */}

    <div className={className}>{children}</div>
  </div>
);

Layout.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Layout;
