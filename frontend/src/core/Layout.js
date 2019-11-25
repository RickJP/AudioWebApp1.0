import React from 'react';
import Menu from './Menu';
import PropTypes from 'prop-types';

import '../styles.css';
import 'bootstrap-material-design/dist/css/bootstrap-material-design.min.css';

const Layout = ({className, children}) => (
  <div>
    <div className="jumbotron jumbotron-fluid m-0 pt-5 pb-0 rounded-0">
      <div className="container">
        <h2 className="display-6"></h2>
        {/* <p class="lead">
          Good Luck!
        </p> */}
      </div>
    </div>
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
