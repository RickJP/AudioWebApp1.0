import React, { Component } from 'react';
import './styles/styles.css';
import Layout from '../core/Layout';
import Upload from './Upload';

class UploadFiles extends Component {
  render() {
    return (
      <Layout
      title="Speaking Test 2"
      description=""
      className="container-fluid noselect"
    > 
      <Upload/>
    </Layout>
    )
  }
}

export default UploadFiles;