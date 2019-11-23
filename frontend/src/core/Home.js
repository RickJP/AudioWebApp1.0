import React from "react";
import Layout from "./Layout";


const Home = () => {
    // eslint-disable-next-line no-undef
    localStorage.removeItem('uName');
    return (
        <Layout
            title="Home"
            description="From Temple University"
            className="container-fluid"
        >
           
        </Layout>
    );
};

export default Home;
