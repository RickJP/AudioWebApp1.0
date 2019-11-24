import React from "react";
import Menu from "./Menu";
import PropTypes from 'prop-types';

import "../styles.css";
import 'bootstrap-material-design/dist/css/bootstrap-material-design.min.css';

const Layout = ({className, children}) => (
    <div>
        <Menu />
        {/* <div className="jumbotron">
            <h2>{title}</h2>
            <p className="lead">{description}</p>
        </div> */}
        <div className={className}>{children}</div>
    </div>
)

Layout.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node
}

export default Layout;